/**
 * `Object.prototype.toString.call(value)`の結果
 */
export const ToStringResult = {
  Undefined: '[object Undefined]',
  Null: '[object Null]',
  Boolean: '[object Boolean]',
  Number: '[object Number]',
  String: '[object String]',
  Symbol: '[object Symbol]',
  BigInt: '[object BigInt]',
  Object: '[object Object]',
  Array: '[object Array]',
  Function: '[object Function]',
  Date: '[object Date]',
  RegExp: '[object RegExp]',
  Map: '[object Map]',
  Set: '[object Set]',
  WeakMap: '[object WeakMap]',
  WeakSet: '[object WeakSet]',
  WeakRef: '[object WeakRef]',
  Error: '[object Error]',
  Promise: '[object Promise]',
  Math: '[object Math]',
  JSON: '[object JSON]',
  ArrayBuffer: '[object ArrayBuffer]',
  SharedArrayBuffer: '[object SharedArrayBuffer]',
  DataView: '[object DataView]',
  Arguments: '[object Arguments]',
  Int8Array: '[object Int8Array]',
  Uint8Array: '[object Uint8Array]',
  Uint8ClampedArray: '[object Uint8ClampedArray]',
  Int16Array: '[object Int16Array]',
  Uint16Array: '[object Uint16Array]',
  Int32Array: '[object Int32Array]',
  Uint32Array: '[object Uint32Array]',
  Float32Array: '[object Float32Array]',
  Float64Array: '[object Float64Array]',
  BigInt64Array: '[object BigInt64Array]',
  BigUint64Array: '[object BigUint64Array]',
} as const;
export type ToStringResult =
  (typeof ToStringResult)[keyof typeof ToStringResult];

/**
 * `typeof`の結果
 */
export const TypeOfResult = {
  undefined: 'undefined',
  object: 'object',
  boolean: 'boolean',
  number: 'number',
  bigint: 'bigint',
  string: 'string',
  symbol: 'symbol',
  function: 'function',
} as const;
export type TypeOfResult = (typeof TypeOfResult)[keyof typeof TypeOfResult];
