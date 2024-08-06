import { centToDollar } from '../../scripts/utils/money.js';

//! suite (describe)
describe('test suite: centToDollar', () => {
    // test(it)
  it('converts cents into dollars', () => {
        //* compare two values (expect)
    expect(centToDollar(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(centToDollar(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(centToDollar(2000.5)).toEqual('20.01');
  });

  it('Rounds down to the nearest cent', () => {
    expect(centToDollar(2000.4)).toEqual('20.00');
  })
});