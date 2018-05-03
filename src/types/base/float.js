import fp from 'ieee-float';

export default (bits) => {
  bits = bits === 32 ? 32 : 64;
  const sizeName = bits === 32 ? 'Float' : 'Double';
  const size = bits/8;
  return {
    fromBuffer: byteBuffer => {
      const buffer = byteBuffer.copy(byteBuffer.offset, byteBuffer.offset + size);
      byteBuffer.skip(size);
      const buf = Buffer.from(buffer.toBinary(), 'binary');
      return fp[`read${sizeName}LE`](buf);
    },
    appendBuffer: (byteBuffer, value) => {
      const output = [];
      fp[`write${sizeName}LE`](output, value);
      byteBuffer.append(output);
    }
  };
};
