"""
Chay HEADLESS trong Blender (khong can mo GUI) de convert .glb -> .usdz "nen"
(chi hinh khoi + mau, chua co behavior) — dau vao cho build_interactive_usdz.py.

Usage (tu thu muc apps/fe/scripts/ar-usdz):
  "C:\\Program Files\\Blender Foundation\\Blender 5.2\\blender.exe" --background \
    --python export_usdz_headless.py -- <input.glb> <output.usdz>
"""
import sys
import bpy

argv = sys.argv[sys.argv.index("--") + 1:]
glb_path, usdz_path = argv[0], argv[1]

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=glb_path)

# .glb nen duoc bang Draco (nen mesh), nhung .usdz KHONG ho tro nen mesh — cung so luong
# vertex, usdz se nang hon nhieu lan vi luu float tho. Decimate truoc khi export de bu lai,
# neu khong file se qua nang cho AR tren dien thoai (vd model 1.6M vertex -> usdz >100MB).
DECIMATE_RATIO = 0.15
for obj in bpy.data.objects:
    if obj.type == "MESH":
        mod = obj.modifiers.new(name="AR_Decimate", type="DECIMATE")
        mod.ratio = DECIMATE_RATIO
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier=mod.name)

bpy.ops.wm.usd_export(
    filepath=usdz_path,
    export_textures_mode="NEW",
    usdz_downscale_size="1024",  # anh goc qua nang (glb 15MB -> usdz >100MB neu giu nguyen)
)
print(f"OK: {usdz_path}")
