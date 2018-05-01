import expect from 'expect'

import { ABI } from 'src'

describe('Module template', () => {
  it('test initialize abi', () => {
    const abi = new ABI({
      number: 'uint8'
    });
    console.log(abi.encode({ number: 21 }))
    expect(1).toEqual(1)
  })
})
