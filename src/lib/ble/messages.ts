import { bufferToFloat32, bufferToUint32 } from '../binary/utils';

export class Message {
  static parseNumber(buffer: Uint8Array) {
    // parse number from bytes
    let result = 0;
    for (let x = 0; x < buffer.length; x++) {
      result = result + (buffer[x] << (8 * (buffer.length - 1 - x)));
    }
    return result;
  }
}

export enum MeasurementType {
  TOP,
  BOTTOM,
  EXTRA,
}

export class Measurement extends Message {
  readonly time: number;
  readonly top: number;
  readonly bottom: number;

  constructor(time: number, top: number, bottom: number) {
    super();
    this.time = time;
    this.top = top;
    this.bottom = bottom;
  }

  static fromBuffer(buffer: ArrayBuffer) {
    const _buffer = new Uint8Array(buffer);

    console.log(_buffer, buffer);

    const time = bufferToUint32(_buffer.slice(1, 5));
    const top = bufferToFloat32(_buffer.slice(5, 9));
    const bottom = bufferToFloat32(_buffer.slice(9, 14));

    return new Measurement(time, top, bottom);
  }
}

export enum CommandType {
  TARE,
  START,
  STOP,
  INFO,
}

export class Command {
  protected lead = 0xc0;
}

export class MeasurementFactory {
  // factory
  static fromPayload(buffer: Uint8Array) {
    if (buffer[0] == 0xd0) {
      return Measurement.fromBuffer(buffer);
    }
  }
}
