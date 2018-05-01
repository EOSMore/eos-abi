export default {
  fromBuffer: (byteBuffer) => {
    return byteBuffer.toString();
  },
  appendBuffer: (byteBuffer, value) => {
    byteBuffer.writeVString(value.toString());
  }
}
