// Tải động 3 script 8th Wall (chỉ khi vào trang AR) — không đặt global trong index.html vì
// landing-page.js tự chèn overlay/hint vào DOM ngay khi script chạy xong, kể cả khi chưa gọi
// XR8.run(), gây ảnh hưởng tới các trang khác (Header, layout...) nếu load trên toàn site.
const SCRIPTS = [
  {
    src: 'https://cdn.jsdelivr.net/npm/@8thwall/engine-binary@1/dist/xr.js',
    attrs: { 'data-preload-chunks': 'slam', crossorigin: 'anonymous' },
  },
  {
    src: 'https://cdn.jsdelivr.net/npm/@8thwall/xrextras@1/dist/xrextras.js',
    attrs: { crossorigin: 'anonymous' },
  },
  {
    src: 'https://cdn.jsdelivr.net/npm/@8thwall/landing-page@1/dist/landing-page.js',
    attrs: { crossorigin: 'anonymous' },
  },
];

let loadPromise: Promise<void> | null = null;

function loadScript(src: string, attrs: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Không tải được script: ${src}`));
    document.head.appendChild(script);
  });
}

export function loadXr8Scripts(): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = SCRIPTS.reduce(
    (chain, { src, attrs }) => chain.then(() => loadScript(src, attrs)),
    Promise.resolve()
  );
  return loadPromise;
}
