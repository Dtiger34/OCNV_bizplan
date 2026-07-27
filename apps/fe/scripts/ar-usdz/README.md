# Bake tap-to-show-info hotspot vao USDZ (khong can Mac)

## Bối cảnh

Tren iOS, AR that (Quick Look) mo mot app rieng cua he dieu hanh — trang web (va moi DOM
overlay) bi day ra nen, nen khong the "ve de" point/info-box len tren nhu cach lam tren
Android (WebXR). Muon point tap-duoc NGAY TRONG luc dang AR tren iOS, hotspot phai duoc
"bake" (nhung san) vao chinh file `.usdz`, khong the lam bang React/DOM.

Cach lam chinh thuc cua Apple la dung **Reality Composer** (macOS/iPadOS, GUI) de gan
"behavior" (trigger + action) — cong cu nay tu dong sinh dung schema. Repo nay khong co Mac,
nen dung huong thay the:

- **Kiem tra da lam (khuyen nghi dung ngay)**: `VillageArPage.tsx` da ho tro tap-point-hien-info
  o buoc xem model inline TRUOC khi vao AR — hoat dong tren moi nen tang, khong can file usdz
  dac biet nay.
- **Script trong thu muc nay**: thu bake behavior thang vao usdz de tap duoc TRONG luc dang AR
  that tren iOS — **can test tren iPhone that de xac nhan hoat dong**, vi khong co Mac/iPhone
  o moi truong build de tu verify.

## Do tin cay cua schema dung trong script

`Preliminary_Behavior` / `Preliminary_Trigger` / `Preliminary_Action` la schema rieng cua
Apple, tai lieu chinh thuc (`developer.apple.com/.../preliminary_trigger`) hien da 404. Cau
truc dung trong `build_interactive_usdz.py` duoc doi chieu tu bai reverse-engineer cua
elkraneo.com (dump usda that xuat boi Reality Composer Pro):

```
def Preliminary_Behavior "OnTap"
    rel triggers = [</Root/Entity/OnTap/TapTrigger>]
    rel actions = [</Root/Entity/OnTap/SpinAction>]

def Preliminary_Trigger "TapTrigger"
    token info:id = "TapGesture"
    rel affectedObjects = [</Root/Entity>]

def Preliminary_Action "SpinAction"
    token info:id = "SpinAction"
    float3 axis = (0, 1, 0)
    float duration = 1.0
```

Da xac nhan chac chan (tu 2 nguon doc lap):
- Cau truc `Behavior -> rel triggers/actions`, `Trigger` voi `token info:id = "TapGesture"` +
  `rel affectedObjects` — tu bai reverse-engineer elkraneo.com (dump that tu Reality Composer Pro).
- **Ten class va format `info:id` chinh xac** — tu chinh file dinh nghia schema goc cua Apple
  (copyright Apple Inc. 2020), tim thay trong repo mau WWDC chinh thuc
  `github.com/XRealityZone/apple-wwdc-ar-demo`, file
  `SchemaDefinitionsForThirdPartyDCCs/UsdInteractive/schema.usda`. File nay dinh nghia ro
  `Preliminary_Behavior`/`Preliminary_Trigger`/`Preliminary_Action` giong het cau truc da dung,
  va **vi du gia tri `info:id` cho Action la tu thuan nhu `"Impulse"`, `"Group"` — KHONG co hau
  to `"Action"`**. Dieu nay mau thuan voi vi du `"SpinAction"` cua elkraneo (co the la quy uoc
  rieng cua Reality Composer PRO/RealityKit, khac voi Preliminary_Action co dien cho Quick Look).

**Van chua xac nhan 100%** (suy luan tu quy uoc "Impulse"/"Group"): ten `info:id` chinh xac cho
hanh dong "hien vat the" trong he Preliminary_Action co dien — script dang dung `"Show"` (truoc
day thu `"ShowAction"` va khong hoat dong, khop voi du doan la sai quy uoc). Neu `"Show"` van
sai, hau qua chi la marker khong tap len duoc (model van xem binh thuong, khong crash, khong
mat du lieu) — sua lai o `show_action.CreateAttribute("info:id", ...)` trong
`build_interactive_usdz.py` roi build lai la duoc, khong can lam lai tu dau. Cac bien the khac
co the thu neu `"Show"` cung khong an: `"Visible"`, `"SetVisibility"`, `"Unhide"`.

## Quy trinh 2 buoc

### Buoc 1 — Tao file usdz "nen" (chi hinh khoi + mau, chua co behavior)

Can mot cong cu convert glb -> usdz. Khong dung Reality Composer (khong co Mac), dung
**Blender** (mien phi, chay tren Windows, co san USDZ exporter tu ban 4.x):

1. Cai Blender: https://www.blender.org/download/
2. Mo Blender -> File > Import > glTF 2.0 -> chon file trong `apps/fe/public/models/*.glb`
3. File > Export > Universal Scene Description -> chon dinh dang `.usdz` -> luu vao
   `apps/fe/scripts/ar-usdz/baseline/<ten-model>.usdz`

(Co the tu dong hoa buoc nay bang Blender headless `--background --python export_usdz.py`
neu can lam nhieu model — chua viet vi hien chi co du lieu hotspot cho `bat-trang`.)

### Buoc 2 — Bake hotspot + behavior, dong goi usdz cuoi

```bash
cd apps/fe/scripts/ar-usdz
pip install usd-core Pillow    # thuan Python, chay duoc tren Windows

python build_interactive_usdz.py \
  --usdz baseline/lang-gom.usdz \
  --points points/bat-trang.json \
  --out ../../public/models/lang-gom.usdz
```

File `points/bat-trang.json` phai khop voi `position`/`normal`/`title`/`description` trong
`VILLAGE_AR_POINTS` (`apps/fe/src/features/ar/data/village-ar-points.ts`) — neu sua toa do o
mot cho (vi du sau khi calibrate bang dev helper Alt+click trong `VillageArPage.tsx`), nho
sua ca hai.

### Buoc 3 — Test tren iPhone that

`village-ar-models.ts` da san sang tro `usdz` toi `/models/lang-gom.usdz` cho `bat-trang`.
Mo trang tren Safari iOS, vao AR that (Quick Look), tap vao marker vang — neu panel info
khong hien len, thu doi `info:id` sang cac bien the khac (`"Visible"`, `"SetVisibility"`,
`"Unhide"`) trong `build_interactive_usdz.py` roi build lai, hoac quay lai phuong an
web-preview da co san (khong can sua gi them, da hoat dong).
