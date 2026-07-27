"""
Bake tap-to-show-info hotspot behavior vao mot file .usdz nen (baseline), chay hoan toan
tren Windows bang goi pip `usd-core` — khong can Mac/Reality Composer.

QUAN TRONG - doc README.md cung thu muc truoc khi dung:
Cau truc prim Preliminary_Behavior/Preliminary_Trigger/Preliminary_Action duoc dung o day
la reverse-engineer tu Reality Composer Pro (nguon: elkraneo.com), KHONG phai tai lieu
chinh thuc cua Apple (trang docs goc da bi go). Ten "info:id" cho tap trigger ("TapGesture")
la da xac nhan; ten "ShowAction" cho hanh dong hien panel la suy luan theo quy uoc dat ten
(da xac nhan "SpinAction" ton tai voi cung quy uoc) — CAN TEST TREN IPHONE THAT de xac nhan.
Neu sai, hau qua chi la point khong tap len duoc trong Quick Look — khong anh huong den
viec xem model binh thuong.

Input can chuan bi truoc (script nay KHONG tu convert glb->usd):
  --usdz  file .usdz "nen" (chi co hinh khoi + mau, chua co behavior) cua dung model do,
          xuat bang Blender (File > Export > Universal Scene Description, chon .usdz,
          Blender 4.x+ co san exporter nay, chay duoc tren Windows) tu chinh file .glb dang
          dung trong VILLAGE_AR_MODELS.
  --points file JSON toa do hotspot, xem points/bat-trang.json lam mau — id/position/normal/
          title/description phai khop voi VILLAGE_AR_POINTS trong village-ar-points.ts.

Usage:
  python build_interactive_usdz.py \
    --usdz baseline/lang-gom.usdz \
    --points points/bat-trang.json \
    --out ../../public/models/lang-gom.usdz
"""
import argparse
import json
import os
import shutil
import tempfile
import zipfile

from pxr import Usd, UsdGeom, UsdShade, Sdf, UsdUtils, Gf
from PIL import Image, ImageDraw, ImageFont

# Bang mau dong bo theme AR hien co (xem VillageArPage.tsx)
COLOR_GOLD = (201, 151, 58)
COLOR_BG = (44, 26, 14)
COLOR_TEXT = (245, 237, 214)
COLOR_BODY = (201, 185, 154)


def make_info_texture(title: str, description: str, out_png: str, size=(1024, 512)) -> None:
    img = Image.new("RGBA", size, (*COLOR_BG, 255))
    draw = ImageDraw.Draw(img)
    try:
        title_font = ImageFont.truetype("arialbd.ttf", 56)
        body_font = ImageFont.truetype("arial.ttf", 34)
    except OSError:
        title_font = ImageFont.load_default()
        body_font = ImageFont.load_default()

    draw.rectangle([0, 0, size[0] - 1, size[1] - 1], outline=(*COLOR_GOLD, 255), width=6)
    draw.text((40, 36), title, font=title_font, fill=(*COLOR_TEXT, 255))

    words = description.split()
    lines, line = [], ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=body_font) > size[0] - 80:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)

    y = 130
    for line in lines[:8]:
        draw.text((40, y), line, font=body_font, fill=(*COLOR_BODY, 255))
        y += 44

    img.save(out_png)


def convert_webp_textures(stage: Usd.Stage, extract_dir: str) -> None:
    """USDZ/Quick Look chi ho tro texture PNG/JPEG, khong ho tro webp — model xuat tu Blender
    (giu nguyen webp tu glb goc) se bi render mau hong/tim solid (mau bao loi thieu texture)
    neu khong convert. Convert truc tiep bang PIL roi sua lai moi asset reference trong stage."""
    renamed: dict[str, str] = {}
    for root, _, files in os.walk(extract_dir):
        for fname in files:
            if not fname.lower().endswith(".webp"):
                continue
            webp_path = os.path.join(root, fname)
            png_name = os.path.splitext(fname)[0] + ".png"
            Image.open(webp_path).convert("RGBA").save(os.path.join(root, png_name))
            os.remove(webp_path)
            renamed[fname] = png_name

    if not renamed:
        return

    for prim in stage.Traverse():
        for attr in prim.GetAttributes():
            if attr.GetTypeName() != Sdf.ValueTypeNames.Asset:
                continue
            value = attr.Get()
            if value is None:
                continue
            path_str = value.path
            for old_name, new_name in renamed.items():
                if path_str.endswith(old_name):
                    attr.Set(Sdf.AssetPath(path_str[: -len(old_name)] + new_name))
                    break


def add_hotspot(stage: Usd.Stage, scope_path: str, point: dict, assets_dir: str) -> None:
    pid = point["id"]
    prim_id = pid.replace("-", "_")  # ten prim USD khong duoc chua dau "-"
    pos = point["position"]
    normal = point.get("normal", {"x": 0, "y": 1, "z": 0})

    group_path = f"{scope_path}/Hotspot_{prim_id}"
    marker_path = f"{group_path}/Marker"
    panel_path = f"{group_path}/Panel"
    behavior_path = f"{group_path}/Behavior"
    trigger_path = f"{behavior_path}/TapTrigger"
    show_path = f"{behavior_path}/ShowAction"

    # Marker: qua cau nho danh dau vi tri point tren model
    marker = UsdGeom.Sphere.Define(stage, marker_path)
    marker.CreateRadiusAttr(0.025)
    UsdGeom.XformCommonAPI(marker).SetTranslate(Gf.Vec3d(pos["x"], pos["y"], pos["z"]))
    marker.CreateDisplayColorAttr([Gf.Vec3f(*(c / 255 for c in COLOR_GOLD))])

    # Panel: quad phang chua anh info (title + description), an mac dinh
    png_name = f"info_{pid}.png"
    make_info_texture(point["title"], point["description"], os.path.join(assets_dir, png_name))

    panel = UsdGeom.Mesh.Define(stage, panel_path)
    w, h = 0.5, 0.25
    panel.CreatePointsAttr([
        Gf.Vec3f(-w, 0, 0), Gf.Vec3f(w, 0, 0), Gf.Vec3f(w, h, 0), Gf.Vec3f(-w, h, 0),
    ])
    panel.CreateFaceVertexCountsAttr([4])
    panel.CreateFaceVertexIndicesAttr([0, 1, 2, 3])
    panel.CreateExtentAttr([(-w, 0, 0), (w, h, 0)])
    UsdGeom.XformCommonAPI(panel).SetTranslate(
        Gf.Vec3d(pos["x"] + normal["x"] * 0.05, pos["y"] + 0.05, pos["z"] + normal["z"] * 0.05)
    )
    UsdGeom.PrimvarsAPI(panel).CreatePrimvar(
        "st", Sdf.ValueTypeNames.TexCoord2fArray, UsdGeom.Tokens.faceVarying
    ).Set([(0, 0), (1, 0), (1, 1), (0, 1)])
    panel.CreateVisibilityAttr(UsdGeom.Tokens.invisible)

    material_path = f"{panel_path}/InfoMaterial"
    material = UsdShade.Material.Define(stage, material_path)
    shader = UsdShade.Shader.Define(stage, f"{material_path}/Shader")
    shader.CreateIdAttr("UsdPreviewSurface")
    tex = UsdShade.Shader.Define(stage, f"{material_path}/Texture")
    tex.CreateIdAttr("UsdUVTexture")
    tex.CreateInput("file", Sdf.ValueTypeNames.Asset).Set(f"./{png_name}")
    tex.CreateOutput("rgb", Sdf.ValueTypeNames.Float3)
    shader.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).ConnectToSource(
        tex.ConnectableAPI(), "rgb"
    )
    shader.CreateInput("opacity", Sdf.ValueTypeNames.Float).Set(1.0)
    material.CreateSurfaceOutput().ConnectToSource(shader.ConnectableAPI(), "surface")
    UsdShade.MaterialBindingAPI(panel).Bind(material)

    # Behavior: tap Marker -> hien Panel. Preliminary_* khong co Python schema generated san
    # trong usd-core (day la plugin rieng cua Apple) nen author bang generic Usd.Prim — cau truc
    # rel/token da doi chieu voi vi du that (xem README.md), phan "ShowAction" can test lai.
    behavior = stage.DefinePrim(behavior_path, "Preliminary_Behavior")
    behavior.CreateRelationship("triggers").SetTargets([Sdf.Path(trigger_path)])
    behavior.CreateRelationship("actions").SetTargets([Sdf.Path(show_path)])

    trigger = stage.DefinePrim(trigger_path, "Preliminary_Trigger")
    trigger.CreateAttribute("info:id", Sdf.ValueTypeNames.Token).Set("TapGesture")
    trigger.CreateRelationship("affectedObjects").SetTargets([Sdf.Path(marker_path)])

    show_action = stage.DefinePrim(show_path, "Preliminary_Action")
    show_action.CreateAttribute("info:id", Sdf.ValueTypeNames.Token).Set("ShowAction")
    show_action.CreateRelationship("affectedObjects").SetTargets([Sdf.Path(panel_path)])


def build(usdz_in: str, points_path: str, usdz_out: str) -> None:
    with open(points_path, encoding="utf-8") as f:
        points = json.load(f)

    work_dir = tempfile.mkdtemp(prefix="usdz_build_")
    extract_dir = os.path.join(work_dir, "extracted")
    with zipfile.ZipFile(usdz_in) as zf:
        zf.extractall(extract_dir)
        main_layer_name = zf.namelist()[0]  # quy uoc usdz: file dau tien trong zip la layer goc

    main_layer_path = os.path.join(extract_dir, main_layer_name)
    stage = Usd.Stage.Open(main_layer_path)
    convert_webp_textures(stage, extract_dir)
    default_prim = stage.GetDefaultPrim()
    root_path = str(default_prim.GetPath()) if default_prim else "/Root"

    hotspots_scope = f"{root_path}/ARHotspots"
    UsdGeom.Scope.Define(stage, hotspots_scope)
    for point in points:
        add_hotspot(stage, hotspots_scope, point, extract_dir)

    stage.GetRootLayer().Save()

    os.makedirs(os.path.dirname(usdz_out) or ".", exist_ok=True)
    if os.path.exists(usdz_out):
        os.remove(usdz_out)
    ok = UsdUtils.CreateNewUsdzPackage(main_layer_path, usdz_out)
    if not ok:
        raise SystemExit("UsdUtils.CreateNewUsdzPackage that bai — kiem tra log phia tren")

    shutil.rmtree(work_dir, ignore_errors=True)
    print(f"Da tao {usdz_out} voi {len(points)} hotspot")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--usdz", required=True, help="File .usdz nen (chua co behavior)")
    parser.add_argument("--points", required=True, help="File JSON toa do hotspot")
    parser.add_argument("--out", required=True, help="Duong dan .usdz output")
    args = parser.parse_args()
    build(args.usdz, args.points, args.out)


if __name__ == "__main__":
    main()
