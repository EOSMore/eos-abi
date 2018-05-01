import { Long }  from 'bytebuffer';

export default (bits, unsigned = true, variable = false) => {
  const type = variable ? `Varint${bits}${ unsigned ? '' : 'ZigZag' }` : `${ unsigned ? 'Uint' : 'Int' }${bits}`;
  return {
    fromBuffer: byteBuffer => {
      const value = byteBuffer[`read${type}`]();
      return Long.isLong(value) ? value.toString() : value;
    },
    appendBuffer: (byteBuffer, value) => {
      byteBuffer[`write${type}`](value);
    }
  };
};
