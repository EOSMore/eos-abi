import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import set from 'lodash/set';
import isObject from 'lodash/isObject';
import ByteBuffer from 'bytebuffer';
import types from './types';

const mapTypes = (schema, candidateTypes) => {
  return mapValues(schema, item => {
    if (isObject(item)) {
      return mapTypes(item, candidateTypes);
    }
    return has(candidateTypes, item) ? candidateTypes[item] : types.string;
  });
};

const appendBuffer = (byteBuffer, schema, data) => {
  forEach(schema, (item, key) => {
    const value = has(data, key) ? data[key] : null;
    if (item.isType) {
      item.appendBuffer(byteBuffer, value);
    } else {
      appendBuffer(byteBuffer, item, value);
    }
  });
};

const fromBuffer = (byteBuffer, schema) => {
  const value = {};
  forEach(schema, (item, key) => {
    if (item.isType) {
      set(value, key, item.fromBuffer(byteBuffer));
    } else {
      set(value, key, fromBuffer(byteBuffer, item));
    }
  });
  return value;
};

class ABI {
  constructor(schema = {}, customTypes = {}) {
    this.types = { ...types, ...customTypes };
    this.schema = mapTypes(schema, this.types);
  }
  getSchema() {
    return this.schema;
  }
  serialize(data = {}) {
    const byteBuffer = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    appendBuffer(byteBuffer, this.schema, data);
    return Buffer.from(byteBuffer.copy(0, byteBuffer.offset).toBinary(), 'binary');
  }
  unserialize(buffer) {
    const byteBuffer = ByteBuffer.fromBinary(buffer.toString('binary'), ByteBuffer.LITTLE_ENDIAN);
    return fromBuffer(byteBuffer, this.schema);
  }
  normalize(data = {}) {
    return this.unserialize(this.serialize(data));
  }
}

export default ABI;
