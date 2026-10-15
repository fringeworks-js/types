import type { Override } from './Override';

describe('Override', () => {
  test('同名のプロパティを上書きする', () => {
    type Result = Override<
      { str: string; num: number },
      { num: string; bool: boolean }
    >;
    expectTypeOf<Result['str']>().toEqualTypeOf<string>();
    expectTypeOf<Result['num']>().toEqualTypeOf<string>();
    expectTypeOf<Result['bool']>().toEqualTypeOf<boolean>();
  });

  test('interfaceを指定できる', () => {
    interface Base {
      str: string;
    }
    interface Overrides {
      str: number;
    }
    expectTypeOf<Override<Base, Overrides>['str']>().toEqualTypeOf<number>();
  });
});
