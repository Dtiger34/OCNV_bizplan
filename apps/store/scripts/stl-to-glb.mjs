/**
 * Convert STL binary → GLB với spatial decimation.
 * Chia không gian 3D thành grid cells, mỗi cell chỉ giữ 1 triangle đại diện
 * → mesh liền lạc, không bị rách.
 *
 * Usage: node stl-to-glb.mjs <input.stl> <output.glb> [gridSize=64]
 * gridSize=64 → chia 64x64x64 cells
 */

import fs from 'fs';
import path from 'path';

const [,, inputPath, outputPath, gridArg] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node stl-to-glb.mjs <input.stl> <output.glb> [gridSize=64]');
  process.exit(1);
}
const GRID = parseInt(gridArg ?? '64', 10);

// ── 1. Parse STL binary ──────────────────────────────────────────────────────
console.log('Reading STL...');
const stlBuf = fs.readFileSync(inputPath);
const totalTriangles = stlBuf.readUInt32LE(80);
const TRIANGLE_SIZE = 50;
const dataStart = 84;
console.log(`  Triangles: ${totalTriangles.toLocaleString()}, File: ${(stlBuf.length/1024/1024).toFixed(1)}MB`);

// ── 2. First pass: tính AABB toàn model ────────────────────────────────────
let minX=Infinity,minY=Infinity,minZ=Infinity;
let maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;

for (let i = 0; i < totalTriangles; i++) {
  const base = dataStart + i * TRIANGLE_SIZE + 12;
  for (let v = 0; v < 3; v++) {
    const x = stlBuf.readFloatLE(base + v*12);
    const y = stlBuf.readFloatLE(base + v*12 + 4);
    const z = stlBuf.readFloatLE(base + v*12 + 8);
    if (x<minX)minX=x; if (x>maxX)maxX=x;
    if (y<minY)minY=y; if (y>maxY)maxY=y;
    if (z<minZ)minZ=z; if (z>maxZ)maxZ=z;
  }
}
const rangeX = maxX-minX, rangeY = maxY-minY, rangeZ = maxZ-minZ;
console.log(`  AABB: ${rangeX.toFixed(1)} x ${rangeY.toFixed(1)} x ${rangeZ.toFixed(1)}`);

// ── 3. Spatial decimation: mỗi grid cell giữ 1 triangle (centroid đại diện) ─
const cellMap = new Map(); // key → triangle index

for (let i = 0; i < totalTriangles; i++) {
  const base = dataStart + i * TRIANGLE_SIZE + 12;
  // Tính centroid của triangle
  let cx=0, cy=0, cz=0;
  for (let v = 0; v < 3; v++) {
    cx += stlBuf.readFloatLE(base + v*12);
    cy += stlBuf.readFloatLE(base + v*12 + 4);
    cz += stlBuf.readFloatLE(base + v*12 + 8);
  }
  cx /= 3; cy /= 3; cz /= 3;

  // Map centroid → grid cell
  const gx = Math.min(GRID-1, Math.floor((cx-minX)/rangeX * GRID));
  const gy = Math.min(GRID-1, Math.floor((cy-minY)/rangeY * GRID));
  const gz = Math.min(GRID-1, Math.floor((cz-minZ)/rangeZ * GRID));
  const key = gx * GRID * GRID + gy * GRID + gz;

  if (!cellMap.has(key)) cellMap.set(key, i);
}

const keptTriangles = Array.from(cellMap.values());
console.log(`  Grid: ${GRID}^3 = ${(GRID**3).toLocaleString()} cells`);
console.log(`  Kept: ${keptTriangles.length.toLocaleString()} triangles (${(keptTriangles.length/totalTriangles*100).toFixed(1)}%)`);

// ── 4. Build vertex + index arrays ──────────────────────────────────────────
const vertexCount = keptTriangles.length * 3;
const positions = new Float32Array(vertexCount * 3);
const indices = new Uint32Array(keptTriangles.length * 3);

const cx2 = (minX+maxX)/2, cy2 = (minY+maxY)/2, cz2 = (minZ+maxZ)/2;
const scale = 1 / Math.max(rangeX, rangeY, rangeZ);

let vIdx = 0;
keptTriangles.forEach((triIdx, i) => {
  const base = dataStart + triIdx * TRIANGLE_SIZE + 12;
  for (let v = 0; v < 3; v++) {
    const x = stlBuf.readFloatLE(base + v*12);
    const y = stlBuf.readFloatLE(base + v*12 + 4);
    const z = stlBuf.readFloatLE(base + v*12 + 8);
    positions[vIdx*3]   = (x - cx2) * scale;
    positions[vIdx*3+1] = (y - cy2) * scale;
    positions[vIdx*3+2] = (z - cz2) * scale;
    indices[i*3+v] = vIdx;
    vIdx++;
  }
});

// ── 5. Build GLB ─────────────────────────────────────────────────────────────
const posBuffer = Buffer.from(positions.buffer);
const idxBuffer = Buffer.from(indices.buffer);
const pad = (n) => Math.ceil(n/4)*4;
const posPadded = pad(posBuffer.length);
const idxPadded = pad(idxBuffer.length);
const binaryLen = posPadded + idxPadded;

const json = {
  asset: { version: '2.0', generator: 'stl-to-glb.mjs' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [{
    name: path.basename(inputPath, '.stl'),
    primitives: [{ attributes: { POSITION: 0 }, indices: 1, mode: 4 }],
  }],
  accessors: [
    {
      bufferView: 0, componentType: 5126, count: vertexCount, type: 'VEC3',
      min: [-0.5,-0.5,-0.5], max: [0.5,0.5,0.5],
    },
    {
      bufferView: 1, componentType: 5125, count: keptTriangles.length*3, type: 'SCALAR',
    },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: posBuffer.length, target: 34962 },
    { buffer: 0, byteOffset: posPadded, byteLength: idxBuffer.length, target: 34963 },
  ],
  buffers: [{ byteLength: binaryLen }],
};

const jsonStr = JSON.stringify(json);
const jsonBuf = Buffer.from(jsonStr, 'utf8');
const jsonPadded = pad(jsonBuf.length);
const jsonChunk = Buffer.alloc(jsonPadded, 0x20);
jsonBuf.copy(jsonChunk);

const binaryChunk = Buffer.alloc(binaryLen, 0);
posBuffer.copy(binaryChunk, 0);
idxBuffer.copy(binaryChunk, posPadded);

const totalLen = 12 + 8 + jsonPadded + 8 + binaryLen;
const out = Buffer.alloc(totalLen);
let off = 0;
out.writeUInt32LE(0x46546C67, off); off+=4;
out.writeUInt32LE(2, off); off+=4;
out.writeUInt32LE(totalLen, off); off+=4;
out.writeUInt32LE(jsonPadded, off); off+=4;
out.writeUInt32LE(0x4E4F534A, off); off+=4;
jsonChunk.copy(out, off); off+=jsonPadded;
out.writeUInt32LE(binaryLen, off); off+=4;
out.writeUInt32LE(0x004E4942, off); off+=4;
binaryChunk.copy(out, off);

fs.writeFileSync(outputPath, out);
console.log(`\nOutput: ${outputPath}`);
console.log(`  Size: ${(out.length/1024/1024).toFixed(2)} MB`);
console.log('Done!');
