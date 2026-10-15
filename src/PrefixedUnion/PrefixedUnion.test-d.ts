import type { PrefixedUnion } from './PrefixedUnion';

type Direction = 'top' | 'right' | 'bottom' | 'left';

describe('PrefixedUnion', () => {
  test('全ての値', () => {
    expectTypeOf<PrefixedUnion<'x', Direction>>().toEqualTypeOf<
      'xTop' | 'xRight' | 'xBottom' | 'xLeft'
    >();
  });

  test('一部の値', () => {
    expectTypeOf<
      PrefixedUnion<'x', Direction, 'top' | 'bottom'>
    >().toEqualTypeOf<'xTop' | 'right' | 'xBottom' | 'left'>();
  });

  test('文字列以外の値はそのまま残す', () => {
    expectTypeOf<PrefixedUnion<'x', 'top' | 1 | true>>().toEqualTypeOf<
      'xTop' | 1 | true
    >();
  });
});
