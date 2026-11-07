// 提取 docx 正文文本（按段落和表格），输出 utf-8 md
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = 'C:\\Users\\游翔\\Desktop\\泛卓办公\\06 常州建科院\\接口文档\\结构监测';
const DOCX = path.join(ROOT, '物联网平台测点数据推送说明文档.docx');
const OUT = 'C:\\Users\\游翔\\Documents\\AI work\\Documents_AI\\iot_push_doc.md';

const buf = fs.readFileSync(DOCX);

function findString(buf, sig, from = 0) {
  for (let i = from; i < buf.length - sig.length; i++) {
    let ok = true;
    for (let j = 0; j < sig.length; j++) {
      if (buf[i + j] !== sig[j]) { ok = false; break; }
    }
    if (ok) return i;
  }
  return -1;
}

const eocdSig = Buffer.from([0x50, 0x4b, 0x05, 0x06]);
const eocdIdx = buf.lastIndexOf(eocdSig);
if (eocdIdx < 0) throw new Error('EOCD not found');
const cdCount = buf.readUInt16LE(eocdIdx + 10);
const cdOffset = buf.readUInt32LE(eocdIdx + 16);

const entries = [];
let p = cdOffset;
for (let i = 0; i < cdCount; i++) {
  const sig = buf.readUInt32LE(p);
  if (sig !== 0x02014b50) break;
  const compMethod = buf.readUInt16LE(p + 10);
  const compSize = buf.readUInt32LE(p + 20);
  const uncompSize = buf.readUInt32LE(p + 24);
  const nameLen = buf.readUInt16LE(p + 28);
  const extraLen = buf.readUInt16LE(p + 30);
  const commentLen = buf.readUInt16LE(p + 32);
  const localHeaderOffset = buf.readUInt32LE(p + 42);
  const name = buf.slice(p + 46, p + 46 + nameLen).toString('utf8');
  entries.push({ name, compMethod, compSize, uncompSize, localHeaderOffset });
  p += 46 + nameLen + extraLen + commentLen;
}

function readEntry(e) {
  let q = e.localHeaderOffset;
  const sig = buf.readUInt32LE(q);
  if (sig !== 0x04034b50) throw new Error('local sig mismatch');
  const fnameLen = buf.readUInt16LE(q + 26);
  const fextraLen = buf.readUInt16LE(q + 28);
  const dataStart = q + 30 + fnameLen + fextraLen;
  const data = buf.slice(dataStart, dataStart + e.compSize);
  if (e.compMethod === 0) return data;
  if (e.compMethod === 8) return zlib.inflateRawSync(data);
  throw new Error('unsupported comp method ' + e.compMethod);
}

const docXml = entries.find((x) => x.name === 'word/document.xml');
if (!docXml) throw new Error('document.xml missing');
const xmlBuf = readEntry(docXml);
const xmlStr = xmlBuf.toString('utf8');

let result = '';
let pos = 0;
while (pos < xmlStr.length) {
  const m = xmlStr.slice(pos).match(/<(\/?)w:(p|tbl|tr|tc)\b[^>]*>/);
  if (!m) {
    result += xmlStr.slice(pos);
    break;
  }
  const matchIdx = pos + m.index;
  let seg = xmlStr.slice(pos, matchIdx);
  seg = seg
    .replace(/<w:tab\s*\/>/g, '\t')
    .replace(/<w:br\s*\/>/g, '\n')
    .replace(/<w:[^>]+>/g, '');
  result += seg;
  const isClose = m[1] === '/';
  const tag = m[2];
  if (isClose) {
    if (tag === 'p') result += '\n';
    if (tag === 'tr') result += '\n';
    if (tag === 'tc') result += '\t';
  }
  pos = matchIdx + m[0].length;
}

result = result.replace(/\r/g, '')
  .split('\n')
  .map((l) => l.replace(/[\t ]+/g, ' ').trim())
  .filter((l, idx, arr) => !(l === '' && arr[idx - 1] === ''))
  .join('\n');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, result, 'utf8');
console.log('Wrote', OUT, 'len=', result.length);