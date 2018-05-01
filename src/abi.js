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
    forEach(data, (value, field) => {
      const type = has(this.schema, field) ? this.schema[field] : this.types.string;
      type.appendBuffer(byteBuffer, value);
    });
    return byteBuffer.copy(0, byteBuffer.offset);
  }
}

export default ABI;
