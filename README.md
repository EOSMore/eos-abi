# eos-abi
Javascript Libraries for create eos abi schema
## API
initial abi def
```javascript
const customTypes = {};
const abi = new ABI(customTypes);
```
### abi.createActionData(struct, value)
create an `ActionData` object
- *struct* the action data def
- *value* the action data

Run `actionData.toBytes()` to get the action data in `bytes` format
### abi.createSchema(struct)
create a `Schema` object
- *struct* the schema abi def
Run `schema.normalize(data)` to format data by abi def
## Use
```javascript
import { ABI } from 'eos-abi';
const abi = new ABI();
const actionData = abi.createActionData({
  account: "name",
  memo: "string"
}, {
  account: 'eosio',
  memo: 'hello'
});
const schema = abi.createSchema({
  account: 'name',
  time: 'time',
  key: 'public_key',
  action: {
    name: 'name',
    data: 'bytes'
  }
});
const data = schema.normalize({
  account: 'eosio',
  time: '2018-04-11 12:00',
  key: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
  action: {
    name: 'eosio',
    data: actionData.toBytes()
  }
});
console.log(data);
```
The result is
```javascript
{ account: 'eosio',
  time: '2018-04-11T04:00:00',
  key: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
  action: { 
    name: 'eosio', 
    data: '000000005087a9020568656c6c6f' 
  }
}
```
## Support Types
- bytes
- int8
- int16
- int32
- int64
- name
- public_key
- string
- time
- uint8
- uint16
- uint32
- uint64
- uint128
