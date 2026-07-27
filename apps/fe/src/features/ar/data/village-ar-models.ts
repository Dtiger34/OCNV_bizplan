// Map slug → mô hình 3D — AR đặt mô hình trực tiếp trong phòng (model-viewer), không cần marker/ảnh diorama.
// `usdz` (nếu có) là file đã bake sẵn tap-behavior (xem scripts/ar-usdz/build_interactive_usdz.py) —
// khi có, model-viewer dùng file này cho Quick Look (ios-src) thay vì tự convert từ .glb, nhờ vậy các
// point vẫn tap được ngay trong phiên AR thật trên iOS (không chỉ ở bước xem trước trên web).
export const VILLAGE_AR_MODELS: Record<string, { model: string; usdz?: string; label: string }> = {
  'bat-trang': {
    model: '/models/lang-gom.glb',
    usdz: '/models/lang-gom.usdz',
    label: 'Làng Gốm Bát Tràng',
  },
  'non-chuong': {
    model: '/models/lang-non.glb',
    label: 'Làng Nón Chuông',
  },
  'huong-quang-phu-cau': {
    model: '/models/lang-huong.glb',
    label: 'Làng Hương Quảng Phú Cầu',
  },
  'lua-van-phuc': {
    model: '/models/lang-lua.glb',
    label: 'Làng Lụa Vạn Phúc',
  },
  'quat-chang-son': {
    model: '/models/lang-quat.glb',
    label: 'Làng Quạt Chàng Sơn',
  },
};
