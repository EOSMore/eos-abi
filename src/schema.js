import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import set from 'lodash/set';
import isObject from 'lodash/isObject';
import ByteBuffer from 'bytebuffer';
import Types from './types';

const mapTypes = (struct, candidateTypes) => {
  return mapValues(struct, item => {
    if (isObject(item)) {
      return mapTypes(item, candidateTypes);
    }
    return has(candidateTypes, item) ? candidateTypes[item] : Types.string;
  });
};

const appendBuffer = (byteBuffer, struct, data) => {
  forEach(struct, (item, key) => {
    const value = has(data, key) ? data[key] : null;
    if (item.isType) {
      item.appendBuffer(byteBuffer, value);
    } else {
      appendBuffer(byteBuffer, item, value);
    }
  });
};

const fromBuffer = (byteBuffer, struct) => {
  const value = {};
  forEach(struct, (item, key) => {
    if (item.isType) {
      set(value, key, item.fromBuffer(byteBuffer));
    } else {
      set(value, key, fromBuffer(byteBuffer, item));
    }
  });
  return value;
};

class Schema {
  constructor(struct = {}, types = {}) {
    this.types = types;
    this.struct = mapTypes(struct, this.types);
  }
  getStruct() {
    return this.struct;
  }
  serialize(data = {}) {
    const byteBuffer = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    appendBuffer(byteBuffer, this.struct, data);
    return Buffer.from(byteBuffer.copy(0, byteBuffer.offset).toBinary(), 'binary');
  }
  unserialize(buffer) {
    const byteBuffer = ByteBuffer.fromBinary(buffer.toString('binary'), ByteBuffer.LITTLE_ENDIAN);
    return fromBuffer(byteBuffer, this.struct);
  }
  normalize(data = {}) {
    return this.unserialize(this.serialize(data));
  }
}

export default Schema;
