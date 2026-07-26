// Map slug → mô hình 3D — AR đặt mô hình trực tiếp trong phòng (model-viewer), không cần marker/ảnh diorama
export const VILLAGE_AR_MODELS: Record<string, { model: string; label: string }> = {
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
