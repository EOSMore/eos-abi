import { PublicKey } from 'eosjs-ecc';

export default {
  fromBuffer: byteBuffer => {
    const buffer = byteBuffer.copy(byteBuffer.offset, byteBuffer.offset + 33);
    byteBuffer.skip(33);
    const publicKeyBuffer = Buffer.from(buffer.toBinary(), 'binary');
    return PublicKey.fromBuffer(publicKeyBuffer).toString();
  },
  appendBuffer: (byteBuffer, value) => {
    const buffer = PublicKey.fromStringOrThrow(value).toBuffer();
    byteBuffer.append(buffer.toString('binary'), 'binary');
  }
}
