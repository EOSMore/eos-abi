import BN from 'bn.js';

export default (bits, unsigned = true) => {
  const size = bits/8;
  return {
    fromBuffer: byteBuffer => {
      const buffer = byteBuffer.copy(byteBuffer.offset, byteBuffer.offset + size);
      byteBuffer.skip(size);
      let bn = new BN(buffer.toHex(), 'hex');
      let buf = bn.toArrayLike(Buffer, 'le', size);
      bn = new BN(buf.toString('hex'), 'hex');
      if (!unsigned) {
        bn = bn.fromTwos(bits);
      }
      return bits > 53 ? bn.toString() : bn.toNumber();
    },
    appendBuffer: (byteBuffer, value) => {
      let bn = new BN(value);
      if (!unsigned) {
        bn = bn.toTwos(bits);
      }
      const buf = bn.toArrayLike(Buffer, 'le', size);
      byteBuffer.append(buf.toString('binary'), 'binary');
    }
  };
};
