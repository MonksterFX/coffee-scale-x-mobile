export class Message {
  // factory
  static fromPayload(buffer: Uint8Array) {
    return new Message();
  }
}

export enum MeasurementType {
  TOP,
  BOTTOM,
  EXTRA,
}

export class Measurement extends Message {
  protected lead = 0xd1;
  readonly top: number;
  readonly bottom: number;

  constructor(top: number, bottom: number) {
    super();
    this.top = top;
    this.bottom = bottom;
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
