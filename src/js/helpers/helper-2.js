function _printBearIsInternalFn(msg) {
  console.log(msg);
}

export function helper() {
  _printBearIsInternalFn('I am helper bear!');
}

export default function defaultBear() {
  _printBearIsInternalFn('I\'m default bear in this file');
}

