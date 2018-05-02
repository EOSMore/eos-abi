class ActionData {
  constructor(schema, value = {}) {
    this.value = value;
    this.schema = schema;
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
    return this;
  }
  toBytes() {
    const buffer = this.schema.serialize(this.value);
    return buffer.toString('hex');
  }
}

export default ActionData;
