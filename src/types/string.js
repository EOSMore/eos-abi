export default {
  fromBuffer: (byteBuffer) => {
    return byteBuffer.readVString();
  },
  appendBuffer: (byteBuffer, value) => {
    byteBuffer.writeVString(value.toString());
  }
}
