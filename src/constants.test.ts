import { ToStringResult, TypeOfResult } from './constants';

const toString = (value: unknown) => Object.prototype.toString.call(value);

describe('ToStringResult', () => {
  test.each([
    [ToStringResult.Undefined, undefined],
    [ToStringResult.Null, null],
    [ToStringResult.Boolean, true],
    [ToStringResult.Number, 1],
    [ToStringResult.String, ''],
    [ToStringResult.Symbol, Symbol('symbol')],
    [ToStringResult.BigInt, 1n],
    [ToStringResult.Object, {}],
    [ToStringResult.Array, []],
    [ToStringResult.Function, () => {}],
    [ToStringResult.Date, new Date()],
    [ToStringResult.RegExp, /regexp/],
    [ToStringResult.Map, new Map()],
    [ToStringResult.Set, new Set()],
    [ToStringResult.WeakMap, new WeakMap()],
    [ToStringResult.WeakSet, new WeakSet()],
    [ToStringResult.WeakRef, new WeakRef({})],
    [ToStringResult.Error, new Error()],
    [ToStringResult.Promise, Promise.resolve()],
    [ToStringResult.Math, Math],
    [ToStringResult.JSON, JSON],
    [ToStringResult.ArrayBuffer, new ArrayBuffer(1)],
    [ToStringResult.SharedArrayBuffer, new SharedArrayBuffer(1)],
    [ToStringResult.DataView, new DataView(new ArrayBuffer(1))],
    [
      ToStringResult.Arguments,
      (function () {
        // Arguments オブジェクトそのものを作るため、rest 引数（配列になる）は使えない
        // eslint-disable-next-line prefer-rest-params
        return arguments;
      })(),
    ],
    [ToStringResult.Int8Array, new Int8Array()],
    [ToStringResult.Uint8Array, new Uint8Array()],
    [ToStringResult.Uint8ClampedArray, new Uint8ClampedArray()],
    [ToStringResult.Int16Array, new Int16Array()],
    [ToStringResult.Uint16Array, new Uint16Array()],
    [ToStringResult.Int32Array, new Int32Array()],
    [ToStringResult.Uint32Array, new Uint32Array()],
    [ToStringResult.Float32Array, new Float32Array()],
    [ToStringResult.Float64Array, new Float64Array()],
    [ToStringResult.BigInt64Array, new BigInt64Array()],
    [ToStringResult.BigUint64Array, new BigUint64Array()],
  ])('%s', (expected, value) => {
    expect(toString(value)).toBe(expected);
  });
});

describe('TypeOfResult', () => {
  test.each([
    [TypeOfResult.undefined, undefined],
    [TypeOfResult.object, null],
    [TypeOfResult.boolean, true],
    [TypeOfResult.number, 1],
    [TypeOfResult.bigint, 1n],
    [TypeOfResult.string, ''],
    [TypeOfResult.symbol, Symbol('symbol')],
    [TypeOfResult.function, () => {}],
  ])('%s', (expected, value) => {
    expect(typeof value).toBe(expected);
  });
});
