export default {
  fromBuffer: byteBuffer => {
    const len = byteBuffer.readVarint32();
    const buffer = byteBuffer.copy(byteBuffer.offset, byteBuffer.offset + len);
    byteBuffer.skip(len);
    return Buffer.from(buffer.toBinary(), 'binary').toString('hex');
  },
  appendBuffer: (byteBuffer, value) => {
    value = Buffer.from(value, 'hex');
    byteBuffer.writeVarint32(value.length);
    byteBuffer.append(value.toString('binary'), 'binary');
  }
}
