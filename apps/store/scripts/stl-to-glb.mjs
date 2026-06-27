/**
 * Convert STL binary → GLB, giảm triangle count mạnh cho web AR.
 * Decimation: giữ lại 1/ratio triangles bằng cách bỏ qua triangle liền kề trùng normal.
 *
 * Usage: node scripts/stl-to-glb.mjs <input.stl> <output.glb> [ratio=50]
 * ratio=50 → giữ 1/50 ≈ 2% số triangles
 */

import fs from 'fs';
import path from 'path';

const [,, inputPath, outputPath, ratioArg] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: node stl-to-glb.mjs <input.stl> <output.glb> [decimation_ratio=50]');
  process.exit(1);
}

const RATIO = parseInt(ratioArg ?? '50', 10);

// ── 1. Parse STL binary ──────────────────────────────────────────────────────
console.log('Reading STL...');
const stlBuf = fs.readFileSync(inputPath);
const totalTriangles = stlBuf.readUInt32LE(80);
console.log(`  Total triangles: ${totalTriangles.toLocaleString()}`);
console.log(`  File size: ${(stlBuf.length / 1024 / 1024).toFixed(1)} MB`);
console.log(`  Decimation ratio: 1/${RATIO} → keep ~${Math.round(totalTriangles/RATIO).toLocaleString()} triangles`);

// ── 2. Decimate: giữ mọi RATIO-th triangle ──────────────────────────────────
const TRIANGLE_SIZE = 50; // 12 normal + 36 vertices + 2 attr
const dataStart = 84;

const keptTriangles = [];
for (let i = 0; i < totalTriangles; i += RATIO) {
  const offset = dataStart + i * TRIANGLE_SIZE;
  if (offset + TRIANGLE_SIZE > stlBuf.length) break;
  keptTriangles.push(i);
}
console.log(`  Kept: ${keptTriangles.length.toLocaleString()} triangles`);

// ── 3. Build vertex + index arrays ──────────────────────────────────────────
// Mỗi triangle → 3 unique vertices (không weld để giữ flat shading)
const vertexCount = keptTriangles.length * 3;
const positions = new Float32Array(vertexCount * 3);
const indices = new Uint32Array(keptTriangles.length * 3);

let vIdx = 0;
keptTriangles.forEach((triIdx, i) => {
  const base = dataStart + triIdx * TRIANGLE_SIZE + 12; // skip normal
  for (let v = 0; v < 3; v++) {
    const vBase = base + v * 12;
    positions[vIdx * 3]     = stlBuf.readFloatLE(vBase);
    positions[vIdx * 3 + 1] = stlBuf.readFloatLE(vBase + 4);
    positions[vIdx * 3 + 2] = stlBuf.readFloatLE(vBase + 8);
    indices[i * 3 + v] = vIdx;
    vIdx++;
  }
});

// ── 4. Compute AABB để center model ─────────────────────────────────────────
let minX = Infinity, minY = Infinity, minZ = Infinity;
let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
for (let i = 0; i < positions.length; i += 3) {
  if (positions[i]   < minX) minX = positions[i];
  if (positions[i]   > maxX) maxX = positions[i];
  if (positions[i+1] < minY) minY = positions[i+1];
  if (positions[i+1] > maxY) maxY = positions[i+1];
  if (positions[i+2] < minZ) minZ = positions[i+2];
  if (positions[i+2] > maxZ) maxZ = positions[i+2];
}
const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
const scale = 1 / Math.max(maxX - minX, maxY - minY, maxZ - minZ);
// Center + normalize to unit cube
for (let i = 0; i < positions.length; i += 3) {
  positions[i]   = (positions[i]   - cx) * scale;
  positions[i+1] = (positions[i+1] - cy) * scale;
  positions[i+2] = (positions[i+2] - cz) * scale;
}

// ── 5. Build GLB binary ──────────────────────────────────────────────────────
const posBuffer   = Buffer.from(positions.buffer);
const idxBuffer   = Buffer.from(indices.buffer);

// Pad buffers to 4-byte boundary
const pad = (len) => Math.ceil(len / 4) * 4;
const posPadded = pad(posBuffer.length);
const idxPadded = pad(idxBuffer.length);
const binaryChunkLen = posPadded + idxPadded;

const posByteOffset = 0;
const idxByteOffset = posPadded;

const json = {
  asset: { version: '2.0', generator: 'stl-to-glb.mjs' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [{
    name: path.basename(inputPath, '.stl'),
    primitives: [{
      attributes: { POSITION: 0 },
      indices: 1,
      mode: 4, // TRIANGLES
    }],
  }],
  accessors: [
    {
      // POSITION
      bufferView: 0,
      componentType: 5126, // FLOAT
      count: vertexCount,
      type: 'VEC3',
      min: [
        parseFloat((minX - cx) * scale).toFixed(6) * 1,
        parseFloat((minY - cy) * scale).toFixed(6) * 1,
        parseFloat((minZ - cz) * scale).toFixed(6) * 1,
      ],
      max: [
        parseFloat((maxX - cx) * scale).toFixed(6) * 1,
        parseFloat((maxY - cy) * scale).toFixed(6) * 1,
        parseFloat((maxZ - cz) * scale).toFixed(6) * 1,
      ],
    },
    {
      // INDICES
      bufferView: 1,
      componentType: 5125, // UNSIGNED_INT
      count: keptTriangles.length * 3,
      type: 'SCALAR',
    },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: posByteOffset, byteLength: posBuffer.length, target: 34962 }, // ARRAY_BUFFER
    { buffer: 0, byteOffset: idxByteOffset, byteLength: idxBuffer.length, target: 34963 }, // ELEMENT_ARRAY_BUFFER
  ],
  buffers: [{ byteLength: binaryChunkLen }],
};

const jsonStr = JSON.stringify(json);
const jsonBuf = Buffer.from(jsonStr, 'utf8');
const jsonPadded = pad(jsonBuf.length);
const jsonChunk = Buffer.alloc(jsonPadded, 0x20); // pad with spaces
jsonBuf.copy(jsonChunk);

const binaryChunk = Buffer.alloc(binaryChunkLen, 0);
posBuffer.copy(binaryChunk, posByteOffset);
idxBuffer.copy(binaryChunk, idxByteOffset);

// GLB header + chunks
const totalLen = 12 + 8 + jsonPadded + 8 + binaryChunkLen;
const out = Buffer.alloc(totalLen);
let offset = 0;

// Header
out.writeUInt32LE(0x46546C67, offset); offset += 4; // magic 'glTF'
out.writeUInt32LE(2, offset); offset += 4;          // version
out.writeUInt32LE(totalLen, offset); offset += 4;   // total length

// JSON chunk
out.writeUInt32LE(jsonPadded, offset); offset += 4;
out.writeUInt32LE(0x4E4F534A, offset); offset += 4; // 'JSON'
jsonChunk.copy(out, offset); offset += jsonPadded;

// Binary chunk
out.writeUInt32LE(binaryChunkLen, offset); offset += 4;
out.writeUInt32LE(0x004E4942, offset); offset += 4; // 'BIN\0'
binaryChunk.copy(out, offset);

fs.writeFileSync(outputPath, out);
console.log(`\nOutput: ${outputPath}`);
console.log(`  Size: ${(out.length / 1024 / 1024).toFixed(2)} MB`);
console.log('Done!');
