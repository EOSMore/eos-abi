import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import ByteBuffer from 'bytebuffer';
import types from './types';

class ABI {
  constructor(schema = {}, customTypes = {}) {
    this.types = { ...types, ...customTypes };
    this.schema = mapValues(schema, type => has(this.types, type) ? this.types[type] : this.types.string);
  }
  getSchema() {
    return this.schema;
  }
  encode(data = {}) {
    const byteBuffer = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    forEach(this.schema, (type, field) => {
      const value = has(data, field) ? data[field] : null;
      type.appendBuffer(byteBuffer, value);
    });
    return Buffer.from(byteBuffer.copy(0, byteBuffer.offset).toBinary(), 'binary');
  }
  decode(buffer) {
    const byteBuffer = ByteBuffer.fromBinary(buffer.toString('binary'), ByteBuffer.LITTLE_ENDIAN);
    const value = {};
    forEach(this.schema, (type, field) => {
      value[field] = type.fromBuffer(byteBuffer);
    });
    return value;
  }
}

export default ABI;
