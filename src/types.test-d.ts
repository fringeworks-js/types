import type {
  AsyncFunction,
  EasingFunction,
  Empty,
  EqualityFunction,
  Falsy,
  FilterFunction,
  FormatFunction,
  FormatObject,
  Formatter,
  IndexedIteratee,
  Interpolator,
  LooseAsyncFunction,
  LooseDictionary,
  LooseRecord,
  LooseSyncFunction,
  Nullish,
  Primitive,
  SortFunction,
  StrictAsyncFunction,
  StrictDictionary,
  StrictRecord,
  StrictSyncFunction,
  SyncFunction,
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

describe('レコード型・ディクショナリー型', () => {
  test('LooseRecord・StrictRecord', () => {
    expectTypeOf<LooseRecord>().toEqualTypeOf<Record<PropertyKey, any>>();
    expectTypeOf<StrictRecord>().toEqualTypeOf<Record<PropertyKey, unknown>>();
  });

  test('LooseDictionary・StrictDictionary', () => {
    expectTypeOf<LooseDictionary>().toEqualTypeOf<Record<string, any>>();
    expectTypeOf<StrictDictionary>().toEqualTypeOf<Record<string, unknown>>();
  });
});

describe('関数型', () => {
  test('SyncFunction', () => {
    expectTypeOf<SyncFunction<[string, number], boolean>>().toEqualTypeOf<
      (...args: [string, number]) => boolean
    >();
    expectTypeOf<() => string>().toExtend<StrictSyncFunction>();
    expectTypeOf<(value: string) => string>().toExtend<StrictSyncFunction>();
  });

  test('SyncFunction の既定値は StrictSyncFunction と同じ', () => {
    expectTypeOf<SyncFunction>().toEqualTypeOf<StrictSyncFunction>();
  });

  test('LooseSyncFunction は任意の引数で呼べる', () => {
    expectTypeOf<LooseSyncFunction>().toBeCallableWith(1, 'a', {});
  });

  test('AsyncFunction', () => {
    expectTypeOf<AsyncFunction<[string], number>>().toEqualTypeOf<
      (...args: [string]) => Promise<number>
    >();
    expectTypeOf<() => Promise<void>>().toExtend<StrictAsyncFunction>();
    expectTypeOf<() => void>().not.toExtend<StrictAsyncFunction>();
  });

  test('AsyncFunction の既定値は StrictAsyncFunction と同じ', () => {
    expectTypeOf<AsyncFunction>().toEqualTypeOf<StrictAsyncFunction>();
  });

  test('LooseAsyncFunction は任意の引数で呼べる', () => {
    expectTypeOf<LooseAsyncFunction>().toBeCallableWith(1, 'a', {});
  });
});

describe('イテレーター型', () => {
  test('IndexedIteratee は readonly の配列にも使える', () => {
    const data: readonly number[] = [1, 2];
    const iteratee: IndexedIteratee<number, void> = () => {};
    expectTypeOf(data.forEach).toBeCallableWith(iteratee);
  });

  test('FilterFunction は Array.prototype.filter に渡せる', () => {
    const data: readonly number[] = [1, 2];
    const filter: FilterFunction<number> = (value) => value > 1;
    expectTypeOf(data.filter(filter)).toEqualTypeOf<number[]>();
  });

  test('SortFunction は Array.prototype.sort に渡せる', () => {
    const data: number[] = [2, 1];
    const sort: SortFunction<number> = (a, b) => a - b;
    expectTypeOf(data.sort).toBeCallableWith(sort);
  });

  test('EqualityFunction は2つの値を受け取り boolean を返す', () => {
    expectTypeOf<EqualityFunction<number>>().toEqualTypeOf<
      (a: number, b: number) => boolean
    >();
    expectTypeOf(Object.is).toExtend<EqualityFunction<number>>();
  });
});

describe('書式化の型', () => {
  test('FormatFunction は値を変える関数', () => {
    expectTypeOf<FormatFunction<number>>().toEqualTypeOf<
      (value: number) => string
    >();
    expectTypeOf<FormatFunction<Date, boolean>>().toEqualTypeOf<
      (value: Date) => boolean
    >();
  });

  test('FormatObject に Intl.NumberFormat・Intl.DateTimeFormat を渡せる', () => {
    expectTypeOf<Intl.NumberFormat>().toExtend<FormatObject<number>>();
    expectTypeOf<Intl.DateTimeFormat>().toExtend<FormatObject<Date>>();
  });

  test('Formatter は FormatFunction と FormatObject の union', () => {
    expectTypeOf<Formatter<number>>().toEqualTypeOf<
      FormatFunction<number> | FormatObject<number>
    >();
    expectTypeOf<Intl.NumberFormat>().toExtend<Formatter<number>>();
    expectTypeOf<(value: number) => string>().toExtend<Formatter<number>>();
  });
});

describe('アニメーションの型', () => {
  test('Interpolator は t から値を返す関数', () => {
    expectTypeOf<Interpolator<string>>().toEqualTypeOf<(t: number) => string>();
  });

  test('EasingFunction は t を t に変える関数', () => {
    expectTypeOf<EasingFunction>().toEqualTypeOf<(t: number) => number>();
    expectTypeOf(Math.sqrt).toExtend<EasingFunction>();
  });
});
