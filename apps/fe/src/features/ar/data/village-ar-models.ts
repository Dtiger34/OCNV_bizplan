// Map slug → mô hình 3D dùng cho AR (xem VillageXr8Page.tsx, WebAR qua 8th Wall — world
// tracking chạy ngay trong trang, không mở app rời như Quick Look/Scene Viewer) và cho chế độ
// xem inline (VillagePage.tsx, model-viewer).
export const VILLAGE_AR_MODELS: Record<string, { model: string; label: string }> = {
  'bat-trang': {
    model: '/models/lang-gom.glb',
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
