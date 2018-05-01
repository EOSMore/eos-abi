import moment from 'moment';

export default {
  fromBuffer: byteBuffer => {
    const mills = byteBuffer.readUint32();
    return moment(mills, 'X').toISOString().split('.')[0];
  },
  appendBuffer: (byteBuffer, value) => {
    value = moment(value).unix();
    byteBuffer.writeUint32(value);
  }
}
