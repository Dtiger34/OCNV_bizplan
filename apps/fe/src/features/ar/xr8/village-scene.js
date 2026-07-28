// 8th Wall camera pipeline module: tải model .glb vào scene three.js, đặt xuống mặt phẳng
// tương đối khi người dùng chạm màn hình lần đầu (bản SLAM miễn phí không có plane detection
// thật kiểu ARCore/ARKit — chỉ world-tracking 6DoF; đây đúng là cách 8th Wall tự đặt "ground"
// trong ví dụ chính thức của họ, xem aframe-world-effects-example/tap-place.js).
//
// Gesture điều khiển model sau khi đặt:
// - 1 ngón vuốt dọc (vuốt ngay): nghiêng model quanh trục X (nhìn từ trên xuống/dưới lên)
// - 1 ngón giữ yên ~300ms rồi kéo: di chuyển vị trí model trên mặt phẳng (raycast xuống ground)
// - 2 ngón xoay tròn quanh nhau: xoay model quanh trục Y (360°)
// - 2 ngón kéo dãn/thu hẹp (pinch): zoom to/nhỏ
//
// Khác với model-viewer (Quick Look/Scene Viewer mở app rời), toàn bộ AR session này chạy
// ngay trong chính trang web — camera feed + model 3D cùng nằm trên 1 <canvas> DOM bình
// thường, nên React có thể overlay UI tuỳ biến (point, bong bóng info) đè lên bất cứ lúc nào,
// trên cả iOS lẫn Android.
import * as THREE from 'three';
// GLTFLoader/DRACOLoader tải động (không import tĩnh) — riêng DRACOLoader kéo theo phần code
// giải nén Draco khá nặng, import tĩnh làm chunk trang AR phình gấp ~3 lần (232kB -> 775kB),
// tăng áp lực tải/parse lần đầu trên Safari mobile. Chỉ cần khi thực sự load model (chạm màn
// hình đặt xong không cần nữa), nên trì hoãn tới lúc gọi loadModel().

const MIN_SCALE = 0.33;
const MAX_SCALE = 3;
const TILT_X_FACTOR = 4; // độ nhạy nghiêng trục X (1 ngón vuốt dọc)
const TILT_LIMIT = Math.PI / 3; // giới hạn nghiêng ±60° để tránh lật ngược model

// Toạ độ trung tâm + góc + khoảng cách (spread) giữa các đầu ngón tay đang chạm — dùng scale
// theo kích thước màn hình để hành vi nhất quán trên mọi thiết bị.
function getTouchState(touches) {
  const list = Array.from(touches);
  const cx = list.reduce((sum, t) => sum + t.clientX, 0) / list.length;
  const cy = list.reduce((sum, t) => sum + t.clientY, 0) / list.length;
  const screenScale = 2 / (window.innerWidth + window.innerHeight);
  const state = { touchCount: list.length, position: { x: cx * screenScale, y: cy * screenScale } };
  if (list.length >= 2) {
    const [a, b] = list;
    state.spread = Math.sqrt((a.clientX - b.clientX) ** 2 + (a.clientY - b.clientY) ** 2) * screenScale;
    state.angle = Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX);
  }
  return state;
}

// Chênh lệch góc ngắn nhất giữa 2 góc (radian), xử lý wrap-around qua ±π — nếu trừ trực tiếp,
// góc nhảy từ gần π sang gần -π (hoặc ngược lại) sẽ bị tính sai thành một vòng quay lớn.
function angleDelta(from, to) {
  let delta = to - from;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  return delta;
}

export function createVillageScenePipelineModule({ modelUrl, onModelPlaced, onModelReady, onError, onLog }) {
  const log = (...args) => {
    console.log('[VillageAR]', ...args);
    onLog?.(args.map(String).join(' '));
  };

  let model = null;
  let placed = false;
  let baseScale = new THREE.Vector3(1, 1, 1);
  let scaleFactor = 1;
  let tiltX = 0;
  let prevTouch = null;
  let raycaster = null;
  let groundPlane = null; // mặt phẳng ảo ngang qua điểm đặt model, dùng raycast để kéo-di-chuyển

  const loadModel = async (scene) => {
    log('Bắt đầu tải model:', modelUrl);
    let GLTFLoader, DRACOLoader;
    try {
      [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
      ]);
    } catch (err) {
      log('LỖI tải loader:', err?.message || err);
      onError?.(err);
      return;
    }

    // Các file .glb đã nén dùng KHR_draco_mesh_compression (xem lệnh gltf-transform lúc build)
    // — GLTFLoader trơn tải được file (100% download) nhưng không tự giải nén được phần hình
    // học Draco nếu thiếu DRACOLoader, nên load() báo lỗi dù request mạng đã thành công.
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      modelUrl,
      (gltf) => {
        log('Model tải xong');
        model = gltf.scene;
        model.visible = false; // ẩn cho tới khi người dùng chạm để đặt
        scene.add(model);
        baseScale = model.scale.clone();
        onModelReady?.();
      },
      undefined,
      (err) => {
        log('LỖI tải model:', err?.message || err);
        onError?.(err);
      }
    );
  };

  const placeModel = (camera) => {
    if (!model) {
      log('Chạm để đặt nhưng model chưa tải xong');
      return;
    }
    if (placed) return;
    // Đặt model trước camera 1.5m theo hướng nhìn hiện tại, hạ xuống mặt phẳng tương đối y=0
    // (world origin của session — xem ghi chú đầu file về giới hạn SLAM miễn phí).
    const forward = new THREE.Vector3(0, 0, -1.5).applyQuaternion(camera.quaternion);
    model.position.set(camera.position.x + forward.x, 0, camera.position.z + forward.z);
    model.visible = true;
    placed = true;
    groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    onModelPlaced?.(model);
  };

  // 1 ngón vuốt dọc (vuốt ngay, không giữ): nghiêng model quanh trục X, giới hạn góc để không
  // lật úp model.
  const handleOneFingerTilt = (dy) => {
    if (!model) return;
    tiltX = Math.min(Math.max(tiltX + dy * TILT_X_FACTOR, -TILT_LIMIT), TILT_LIMIT);
    model.rotation.x = tiltX;
  };

  // 1 ngón giữ yên rồi kéo: di chuyển model theo mặt phẳng ảo ngang qua điểm đặt ban đầu.
  const handleDrag = (clientX, clientY, camera) => {
    if (!model || !groundPlane || !raycaster) return;
    const ndcX = (clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(groundPlane, hit)) {
      model.position.x = hit.x;
      model.position.z = hit.z;
    }
  };

  // 2 ngón xoay tròn quanh nhau (góc giữa 2 điểm chạm thay đổi): xoay model quanh trục Y.
  const handleTwoFingerRotateY = (angleChange) => {
    if (!model) return;
    model.rotation.y += angleChange;
  };

  // 2 ngón kéo dãn/thu hẹp (khoảng cách giữa 2 điểm chạm thay đổi): zoom to/nhỏ.
  const handlePinchScale = (spreadChange, startSpread) => {
    if (!model || !startSpread) return;
    scaleFactor *= 1 + spreadChange / startSpread;
    scaleFactor = Math.min(Math.max(scaleFactor, MIN_SCALE), MAX_SCALE);
    model.scale.set(baseScale.x * scaleFactor, baseScale.y * scaleFactor, baseScale.z * scaleFactor);
  };

  return {
    name: 'villageScene',

    onStart: ({ canvas }) => {
      const { scene, camera } = XR8.Threejs.xrScene();
      raycaster = new THREE.Raycaster();

      const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      scene.add(light);
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(2, 4, 2);
      scene.add(dirLight);

      loadModel(scene);

      canvas.addEventListener('touchmove', (e) => e.preventDefault());

      let dragTimer = null;
      let isDragging = false;

      canvas.addEventListener(
        'touchstart',
        (e) => {
          if (!placed) {
            if (e.touches.length === 1) placeModel(camera);
            return;
          }
          prevTouch = getTouchState(e.touches);
          if (e.touches.length === 1) {
            // Giữ 300ms không di chuyển thì chuyển sang chế độ kéo-di-chuyển — vuốt ngay (không
            // giữ) vẫn là nghiêng như bình thường.
            dragTimer = setTimeout(() => {
              isDragging = true;
            }, 300);
          }
        },
        true
      );

      canvas.addEventListener(
        'touchmove',
        (e) => {
          if (!placed || !prevTouch) return;
          const current = getTouchState(e.touches);

          if (current.touchCount !== prevTouch.touchCount) {
            prevTouch = current;
            return;
          }

          if (current.touchCount === 1) {
            if (isDragging) {
              handleDrag(e.touches[0].clientX, e.touches[0].clientY, camera);
            } else {
              handleOneFingerTilt(current.position.y - prevTouch.position.y);
            }
          } else if (current.touchCount === 2 && current.spread && prevTouch.spread) {
            handlePinchScale(current.spread - prevTouch.spread, prevTouch.spread);
            if (current.angle != null && prevTouch.angle != null) {
              handleTwoFingerRotateY(angleDelta(prevTouch.angle, current.angle));
            }
          }

          prevTouch = current;
        },
        true
      );

      canvas.addEventListener(
        'touchend',
        (e) => {
          clearTimeout(dragTimer);
          isDragging = false;
          prevTouch = e.touches.length > 0 ? getTouchState(e.touches) : null;
        },
        true
      );

      XR8.XrController.updateCameraProjectionMatrix({
        origin: camera.position,
        facing: camera.quaternion,
      });
    },
  };
}
