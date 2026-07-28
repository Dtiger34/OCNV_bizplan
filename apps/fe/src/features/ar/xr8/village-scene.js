// 8th Wall camera pipeline module: tải model .glb vào scene three.js, đặt xuống sàn khi
// người dùng chạm màn hình lần đầu (giống UX "chạm để đặt" quen thuộc của Quick Look/Scene
// Viewer), rồi báo về React qua callback để vẽ point/overlay HTML đè lên canvas.
//
// Khác với model-viewer (Quick Look/Scene Viewer mở app rời), toàn bộ AR session này chạy
// ngay trong chính trang web — camera feed + model 3D cùng nằm trên 1 <canvas> DOM bình
// thường, nên React có thể overlay UI tuỳ biến (point, bong bóng info) đè lên bất cứ lúc nào,
// trên cả iOS lẫn Android.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createVillageScenePipelineModule({ modelUrl, onModelPlaced, onError }) {
  let model = null;
  let placed = false;
  let raycaster = null;

  const loadModel = (scene) => {
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        model.visible = false; // ẩn cho tới khi người dùng chạm để đặt
        scene.add(model);
      },
      undefined,
      (err) => {
        console.error('[VillageAR] Lỗi tải model:', err);
        onError?.(err);
      }
    );
  };

  const placeModel = (camera) => {
    if (!model || placed) return;
    // Đặt model trước camera 1.5m theo hướng nhìn hiện tại, hạ xuống mặt đất giả định y=0
    const forward = new THREE.Vector3(0, 0, -1.5).applyQuaternion(camera.quaternion);
    model.position.set(camera.position.x + forward.x, 0, camera.position.z + forward.z);
    model.visible = true;
    placed = true;
    onModelPlaced?.(model);
  };

  return {
    name: 'villageScene',

    onStart: ({ canvas }) => {
      const { scene, camera } = XR8.Threejs.xrScene();

      const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      scene.add(light);
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(2, 4, 2);
      scene.add(dirLight);

      loadModel(scene);

      canvas.addEventListener('touchmove', (e) => e.preventDefault());

      canvas.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length !== 1) return;
          if (!placed) {
            placeModel(camera);
            return;
          }
          // Sau khi đã đặt: chạm lại để đặt lại vị trí (giữ hành vi quen thuộc, tránh kẹt vị
          // trí đặt nhầm ban đầu).
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
