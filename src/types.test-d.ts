import type {
  AsyncFunction,
  AsyncStrictFunction,
  Empty,
  Falsy,
  IndexedIteratee,
  KeyedIteratee,
  Nullish,
  Primitive,
  SyncFunction,
  SyncStrictFunction,
} from './types';

describe('値の型', () => {
  test('Nullish', () => {
    expectTypeOf<Nullish>().toEqualTypeOf<undefined | null>();
  });

  test('Primitive', () => {
    expectTypeOf<Primitive>().toEqualTypeOf<
      undefined | null | boolean | number | bigint | string | symbol
    >();
    expectTypeOf<object>().not.toExtend<Primitive>();
  });

  test('Empty', () => {
    expectTypeOf<Empty>().toEqualTypeOf<undefined | null | ''>();
  });

  test('Falsy', () => {
    expectTypeOf<Falsy>().toEqualTypeOf<
      undefined | null | '' | false | 0 | 0n
    >();
    expectTypeOf<1>().not.toExtend<Falsy>();
    expectTypeOf<number>().not.toExtend<Falsy>();
  });
});

describe('関数型', () => {
  test('SyncFunction', () => {
    expectTypeOf<SyncFunction<[string, number], boolean>>().toEqualTypeOf<
      (...args: [string, number]) => boolean
    >();
    expectTypeOf<() => string>().toExtend<SyncStrictFunction>();
    expectTypeOf<(value: string) => string>().toExtend<SyncStrictFunction>();
  });

  test('AsyncFunction', () => {
    expectTypeOf<AsyncFunction<[string], number>>().toEqualTypeOf<
      (...args: [string]) => Promise<number>
    >();
    expectTypeOf<() => Promise<void>>().toExtend<AsyncStrictFunction>();
    expectTypeOf<() => void>().not.toExtend<AsyncStrictFunction>();
  });
});

describe('イテレーター型', () => {
  test('IndexedIteratee は readonly の配列にも使える', () => {
    const data: readonly number[] = [1, 2];
    const iteratee: IndexedIteratee<number, void> = () => {};
    expectTypeOf(data.forEach).toBeCallableWith(iteratee);
  });

  test('KeyedIteratee のキーは既定で string', () => {
    expectTypeOf<Parameters<KeyedIteratee<number, void>>>().toEqualTypeOf<
      [number, string, Readonly<Record<string, number>>]
    >();
  });

  test('KeyedIteratee のキーを指定できる', () => {
    expectTypeOf<
      Parameters<KeyedIteratee<number, void, 'a' | 'b'>>
    >().toEqualTypeOf<
      [number, 'a' | 'b', Readonly<Record<'a' | 'b', number>>]
    >();
  });
});
