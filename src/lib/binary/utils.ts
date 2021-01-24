// excelent documentation: https://javascript.info/arraybuffer-binary-arrays
// https://www.npmjs.com/package/byte-base64
import * as base64 from 'byte-base64';

export function base64ToUint8Array(base64: string): Uint8Array {
  // should be optimized
  const binaryString = atob(base64);
  const len = binaryString.length;

  // prepare buffer
  const bytes = new Uint8Array(len);

  // convert each byte
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export function uint8ArrayToBase64(buffer: Uint8Array) {
  const decodedString = String.fromCharCode(...buffer);
  return btoa(decodedString);
  // return base64.bytesToBase64(buffer);
}

export function bufferToFloat32(buffer: Uint8Array): number {
  return new DataView(buffer.buffer).getFloat32(0);
}

export function bufferToUint32(buffer: Uint8Array): number {
  return new DataView(buffer.buffer).getUint32(0);
}
