/**
 * STL → GLB dùng @gltf-transform: parse STL → tạo Document đúng cách → weld → simplify → export.
 * Không dùng spatial grid, dùng meshoptimizer qua gltf-transform.
 */
import fs from 'fs';
import { Document, NodeIO } from '@gltf-transform/core';
import { weld, simplify, prune } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';

const [,, inputPath, outputPath, ratioArg] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node stl-to-glb-v3.mjs <input.stl> <output.glb> [ratio=0.02]');
  process.exit(1);
}
const RATIO = parseFloat(ratioArg ?? '0.02');

await MeshoptSimplifier.ready;

// ── 1. Parse STL binary ───────────────────────────────────────────────────────
console.log('Reading STL...');
const stlBuf = fs.readFileSync(inputPath);
const totalTri = stlBuf.readUInt32LE(80);
const TSTRIDE = 50;
const dataStart = 84;
console.log(`  Triangles: ${totalTri.toLocaleString()} | ${(stlBuf.length/1024/1024).toFixed(1)}MB`);

// ── 2. Extract vertices (unindexed) ──────────────────────────────────────────
const posData = new Float32Array(totalTri * 9);
for (let i = 0; i < totalTri; i++) {
  const base = dataStart + i * TSTRIDE + 12;
  for (let v = 0; v < 3; v++) {
    posData[i*9+v*3]   = stlBuf.readFloatLE(base + v*12);
    posData[i*9+v*3+1] = stlBuf.readFloatLE(base + v*12 + 4);
    posData[i*9+v*3+2] = stlBuf.readFloatLE(base + v*12 + 8);
  }
}

// Sequential indices (unindexed)
const idxData = new Uint32Array(totalTri * 3);
for (let i = 0; i < idxData.length; i++) idxData[i] = i;

// ── 3. Build gltf-transform Document ─────────────────────────────────────────
console.log('Building GLtf document...');
const doc = new Document();
const buf = doc.createBuffer();

const posAccessor = doc.createAccessor()
  .setType('VEC3')
  .setArray(posData)
  .setBuffer(buf);

const idxAccessor = doc.createAccessor()
  .setType('SCALAR')
  .setArray(idxData)
  .setBuffer(buf);

const prim = doc.createPrimitive()
  .setAttribute('POSITION', posAccessor)
  .setIndices(idxAccessor);

const mesh = doc.createMesh('lang-non').addPrimitive(prim);
const node = doc.createNode('root').setMesh(mesh);
const scene = doc.createScene().addChild(node);
doc.getRoot().setDefaultScene(scene);

// ── 4. Weld → simplify ───────────────────────────────────────────────────────
console.log('Welding...');
await doc.transform(weld({ tolerance: 1e-4 }));

const afterWeld = doc.getRoot().listMeshes()[0].listPrimitives()[0]
  .getIndices().getCount();
console.log(`  After weld: ${(afterWeld/3).toLocaleString()} triangles`);

console.log(`Simplifying to ${(RATIO*100).toFixed(1)}%...`);
await doc.transform(
  simplify({ simplifier: MeshoptSimplifier, ratio: RATIO, error: 0.01 })
);

const afterSimp = doc.getRoot().listMeshes()[0].listPrimitives()[0]
  .getIndices().getCount();
console.log(`  After simplify: ${(afterSimp/3).toLocaleString()} triangles`);

await doc.transform(prune());

// ── 5. Export GLB ─────────────────────────────────────────────────────────────
console.log('Exporting...');
const io = new NodeIO();
const glbBytes = await io.writeBinary(doc);
fs.writeFileSync(outputPath, glbBytes);
console.log(`\nOutput: ${outputPath}`);
console.log(`  Size: ${(glbBytes.byteLength/1024/1024).toFixed(2)} MB`);
console.log('Done!');
