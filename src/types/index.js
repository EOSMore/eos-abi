import mapValues from 'lodash/mapValues';

import bytes from './bytes';
import int8 from './int8';
import int16 from './int16';
import int32 from './int32';
import int64 from './int64';
import name from './name';
import public_key from './public_key';
import string from './string';
import time from './time';
import uint8 from './uint8';
import uint16 from './uint16';
import uint32 from './uint32';
import uint64 from './uint64';
import uint128 from './uint128';

const types = {
  bytes,
  int8,
  int16,
  int32,
  int64,
  name,
  public_key,
  string,
  time,
  uint8,
  uint16,
  uint32,
  uint64,
  uint128
};

const defaultProps = {
  isType: true
};

export default mapValues(types, type => ({ ...type, ...defaultProps }));
