/**
 * STL binary → GLB với proper mesh simplification dùng meshoptimizer.
 * Weld vertices trước, simplify sau → mesh liền lạc, không bị vỡ.
 *
 * Usage: node stl-to-glb-v2.mjs <input.stl> <output.glb> [target_ratio=0.02]
 */
import fs from 'fs';
import path from 'path';
import { MeshoptSimplifier } from 'meshoptimizer';

const [,, inputPath, outputPath, ratioArg] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node stl-to-glb-v2.mjs <input.stl> <output.glb> [ratio=0.02]');
  process.exit(1);
}
const TARGET_RATIO = parseFloat(ratioArg ?? '0.02');

await MeshoptSimplifier.ready;

// ── 1. Parse STL ─────────────────────────────────────────────────────────────
console.log('Reading STL...');
const stlBuf = fs.readFileSync(inputPath);
const totalTri = stlBuf.readUInt32LE(80);
const TSTRIDE = 50;
const dataStart = 84;
console.log(`  Triangles: ${totalTri.toLocaleString()} | File: ${(stlBuf.length/1024/1024).toFixed(1)}MB`);

// ── 2. Extract all vertices (unindexed) ──────────────────────────────────────
const rawPositions = new Float32Array(totalTri * 9); // 3 verts * 3 floats
for (let i = 0; i < totalTri; i++) {
  const base = dataStart + i * TSTRIDE + 12;
  for (let v = 0; v < 3; v++) {
    rawPositions[i*9 + v*3]   = stlBuf.readFloatLE(base + v*12);
    rawPositions[i*9 + v*3+1] = stlBuf.readFloatLE(base + v*12 + 4);
    rawPositions[i*9 + v*3+2] = stlBuf.readFloatLE(base + v*12 + 8);
  }
}

// ── 3. Spatial pre-decimate: giữ 1 triangle mỗi grid cell ───────────────────
console.log('Pre-decimating (spatial grid)...');
let minX=Infinity, minY=Infinity, minZ=Infinity;
let maxX=-Infinity, maxY=-Infinity, maxZ=-Infinity;
for (let i = 0; i < rawPositions.length; i += 3) {
  if (rawPositions[i]   < minX) minX = rawPositions[i];
  if (rawPositions[i]   > maxX) maxX = rawPositions[i];
  if (rawPositions[i+1] < minY) minY = rawPositions[i+1];
  if (rawPositions[i+1] > maxY) maxY = rawPositions[i+1];
  if (rawPositions[i+2] < minZ) minZ = rawPositions[i+2];
  if (rawPositions[i+2] > maxZ) maxZ = rawPositions[i+2];
}
const GRID = 100;
const rX = maxX-minX, rY = maxY-minY, rZ = maxZ-minZ;
const cellSet = new Map();
for (let i = 0; i < totalTri; i++) {
  const cx = rawPositions[i*9] + rawPositions[i*9+3] + rawPositions[i*9+6];
  const cy = rawPositions[i*9+1] + rawPositions[i*9+4] + rawPositions[i*9+7];
  const cz = rawPositions[i*9+2] + rawPositions[i*9+5] + rawPositions[i*9+8];
  const gx = Math.min(GRID-1, Math.floor((cx/3-minX)/rX*GRID));
  const gy = Math.min(GRID-1, Math.floor((cy/3-minY)/rY*GRID));
  const gz = Math.min(GRID-1, Math.floor((cz/3-minZ)/rZ*GRID));
  const key = gx*GRID*GRID + gy*GRID + gz;
  if (!cellSet.has(key)) cellSet.set(key, i);
}
const keptTris = Array.from(cellSet.values());
const preTri = keptTris.length;
console.log(`  Pre-decimate: ${preTri.toLocaleString()} triangles kept`);

// Rebuild raw positions chỉ với kept triangles
const prePositions = new Float32Array(preTri * 9);
keptTris.forEach((triIdx, i) => {
  prePositions.set(rawPositions.subarray(triIdx*9, triIdx*9+9), i*9);
});

// ── 4. Weld vertices ──────────────────────────────────────────────────────────
console.log('Welding vertices...');
const vertMap = new Map();
const positions = [];
const indices = new Uint32Array(preTri * 3);
let vertCount = 0;

for (let i = 0; i < preTri * 3; i++) {
  const x = prePositions[i*3], y = prePositions[i*3+1], z = prePositions[i*3+2];
  const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
  let idx = vertMap.get(key);
  if (idx === undefined) {
    idx = vertCount++;
    vertMap.set(key, idx);
    positions.push(x, y, z);
  }
  indices[i] = idx;
}
console.log(`  After weld: ${vertCount.toLocaleString()} vertices, ${preTri.toLocaleString()} triangles`);

const posArray = new Float32Array(positions);

// ── 5. Simplify với meshoptimizer ─────────────────────────────────────────────
console.log(`Simplifying to ${(TARGET_RATIO*100).toFixed(1)}%...`);
const targetIndexCount = Math.floor(Math.floor(preTri * 3 * TARGET_RATIO) / 3) * 3;
let simplifiedIndices, simplifiedTri;
try {
  const posArray32 = new Float32Array(positions);
  [simplifiedIndices] = MeshoptSimplifier.simplify(
    indices, posArray32, 3, targetIndexCount, 0.01
  );
  simplifiedTri = simplifiedIndices.length / 3;
  console.log(`  Result: ${simplifiedTri.toLocaleString()} triangles`);
} catch(e) {
  console.log(`  Simplify failed (${e.message}), using pre-decimated mesh`);
  simplifiedIndices = indices;
  simplifiedTri = preTri;
}

// ── 6. Compute AABB + normalize ───────────────────────────────────────────────
let nminX=Infinity, nminY=Infinity, nminZ=Infinity;
let nmaxX=-Infinity, nmaxY=-Infinity, nmaxZ=-Infinity;
for (let i = 0; i < posArray.length; i += 3) {
  if (posArray[i]   < nminX) nminX = posArray[i];
  if (posArray[i]   > nmaxX) nmaxX = posArray[i];
  if (posArray[i+1] < nminY) nminY = posArray[i+1];
  if (posArray[i+1] > nmaxY) nmaxY = posArray[i+1];
  if (posArray[i+2] < nminZ) nminZ = posArray[i+2];
  if (posArray[i+2] > nmaxZ) nmaxZ = posArray[i+2];
}
const cx = (nminX+nmaxX)/2, cy = (nminY+nmaxY)/2, cz = (nminZ+nmaxZ)/2;
const scale = 1 / Math.max(nmaxX-nminX, nmaxY-nminY, nmaxZ-nminZ);
const normPositions = new Float32Array(posArray.length);
for (let i = 0; i < posArray.length; i += 3) {
  normPositions[i]   = (posArray[i]   - cx) * scale;
  normPositions[i+1] = (posArray[i+1] - cy) * scale;
  normPositions[i+2] = (posArray[i+2] - cz) * scale;
}

// ── 7. Build GLB ──────────────────────────────────────────────────────────────
const posBuffer = Buffer.from(normPositions.buffer);
const idxBuffer = Buffer.from(simplifiedIndices.buffer);
const pad = (n) => Math.ceil(n/4)*4;
const posPad = pad(posBuffer.length);
const idxPad = pad(idxBuffer.length);
const binLen = posPad + idxPad;

const json = {
  asset: { version: '2.0', generator: 'stl-to-glb-v2.mjs' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [{
    name: path.basename(inputPath, '.stl'),
    primitives: [{ attributes: { POSITION: 0 }, indices: 1, mode: 4 }],
  }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: vertCount, type: 'VEC3',
      min: [-0.5,-0.5,-0.5], max: [0.5,0.5,0.5] },
    { bufferView: 1, componentType: 5125, count: simplifiedIndices.length, type: 'SCALAR' },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0,      byteLength: posBuffer.length, target: 34962 },
    { buffer: 0, byteOffset: posPad, byteLength: idxBuffer.length, target: 34963 },
  ],
  buffers: [{ byteLength: binLen }],
};

const jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
const jsonPad = pad(jsonBuf.length);
const jsonChunk = Buffer.alloc(jsonPad, 0x20);
jsonBuf.copy(jsonChunk);

const binChunk = Buffer.alloc(binLen, 0);
posBuffer.copy(binChunk, 0);
idxBuffer.copy(binChunk, posPad);

const totalLen = 12 + 8 + jsonPad + 8 + binLen;
const out = Buffer.alloc(totalLen);
let off = 0;
out.writeUInt32LE(0x46546C67, off); off+=4;
out.writeUInt32LE(2, off); off+=4;
out.writeUInt32LE(totalLen, off); off+=4;
out.writeUInt32LE(jsonPad, off); off+=4;
out.writeUInt32LE(0x4E4F534A, off); off+=4;
jsonChunk.copy(out, off); off+=jsonPad;
out.writeUInt32LE(binLen, off); off+=4;
out.writeUInt32LE(0x004E4942, off); off+=4;
binChunk.copy(out, off);

fs.writeFileSync(outputPath, out);
console.log(`\nOutput: ${outputPath}`);
console.log(`  Size: ${(out.length/1024/1024).toFixed(2)} MB`);
