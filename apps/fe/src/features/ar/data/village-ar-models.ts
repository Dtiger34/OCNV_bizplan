// Map slug → mô hình 3D dùng cho AR (xem VillageXr8Page.tsx, WebAR qua 8th Wall — world
// tracking chạy ngay trong trang, không mở app rời như Quick Look/Scene Viewer) và cho chế độ
// xem inline (VillagePage.tsx, model-viewer).
export const VILLAGE_AR_MODELS: Record<string, { model: string; label: { vi: string; en: string } }> = {
  'bat-trang': {
    model: '/models/lang-gom.glb',
    label: { vi: 'Làng Gốm Bát Tràng', en: 'Bat Trang Ceramic Village' },
  },
  'non-chuong': {
    model: '/models/lang-non.glb',
    label: { vi: 'Làng Nón Chuông', en: 'Chuong Conical Hat Village' },
  },
  'huong-quang-phu-cau': {
    model: '/models/lang-huong.glb',
    label: { vi: 'Làng Hương Quảng Phú Cầu', en: 'Quang Phu Cau Incense Village' },
  },
  'lua-van-phuc': {
    model: '/models/lang-lua.glb',
    label: { vi: 'Làng Lụa Vạn Phúc', en: 'Van Phuc Silk Village' },
  },
  'quat-chang-son': {
    model: '/models/lang-quat.glb',
    label: { vi: 'Làng Quạt Chàng Sơn', en: 'Chang Son Fan Village' },
  },
};
