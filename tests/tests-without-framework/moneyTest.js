import { centToDollar } from '../../scripts/utils/money.js';

//! test suite
console.log('test suite: centToDollar');
// basic test case
console.log('Convert cents into dollars:');
if (centToDollar(2095) === '20.95'){
    console.log('passed');
} else{
    console.log('failed');
}
// basic test case

//* edge case
console.log('Works with 0:');
if (centToDollar(0) === '0.00') {
    console.log('passed');
} else{
    console.log('failed');
}

console.log('Rounds up to the nearest cent:');
if (centToDollar(2000.5) === '20.01') {
    console.log('passed');
} else{
    console.log('failed');
}

console.log('Rounds down to the nearest cent:');
if (centToDollar(2000.4) === '20.00') {
    console.log('passed');
} else{
    console.log('failed');
}
//* edge case
//! test suite