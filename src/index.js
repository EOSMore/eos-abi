import Schema from './schema';
import ActionData from './actionData';
import Types from './types';

class ABI {
  constructor(customType) {
    this.types = { ...Types, ...customType };
  }
  appendTypes(types) {
    this.types = { ...this.types, ...types };
  }
  createSchema(struct) {
    return new Schema(struct, this.types);
  }
  createActionData(struct, value) {
    const schema = this.createSchema(struct);
    return new ActionData(schema, value);
  }
}

export {
  Schema,
  ActionData,
  Types,
  ABI
}
