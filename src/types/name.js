import { Long } from 'bytebuffer';
import min from 'lodash/min';

const charMap = '.12345abcdefghijklmnopqrstuvwxyz';

export default {
  fromBuffer: (byteBuffer) => {
    const bytes = byteBuffer.readUint64().toBytesBE();
    let hex = "";
    bytes.forEach(byte => {
      byte = Number(byte).toString(16);
      hex += (byte.length === 1 ? '0' : '') + byte;
    });
    hex += '0'.repeat(16 - hex.length);

    const fiveBits = Long.fromNumber(0x1f, true);
    const fourBits = Long.fromNumber(0x0f, true);

    let offset = Long.fromString(hex, true, 16);
    let value = "";

    for (let i = 0; i < 12; i++) {
      const index = charMap[offset.and(i === 0 ? fourBits : fiveBits)];
      offset = offset.shiftRight(i === 0 ? 4 : 5);
      value = index + value;
    }

    return value.replace(/\.+$/, '');
  },
  appendBuffer: (byteBuffer, value) => {
    value = String(value);
    let bitStr = '';
    for (let i = 0; i < 12; i++) {
      const index = i < value.length ? charMap.indexOf(value[i]) : 0;
      const bitLen = i < 11 ? 5 : 4;
      let bits = Number(index).toString(2);
      bits = '0'.repeat(bitLen - bits.length) + bits;
      bitStr += bits;
    }

    value = Long.fromString(bitStr, true, 2);

    let hex = '';
    const bytes = value.toBytesBE();
    bytes.forEach(byte => {
      byte = Number(byte).toString(16);
      hex += (byte.length === 1 ? '0' : '') + byte;
    });

    value = Long.fromString(hex, true, 16).toString();

    byteBuffer.writeUint64(value.toString());
  }
}
