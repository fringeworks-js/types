import type { Keys } from './Keys';

type Props = {
  str: string;
  num: number;
  date: Date;
  union: string | number;
  obj: { str: string };
};

type OptionalProps = {
  str?: string;
  num?: number;
  undef?: string | undefined;
  req: string;
};

interface InterfaceProps {
  str: string;
  num: number;
}

describe('Keys', () => {
  test('全てのキー', () => {
    expectTypeOf<Keys<Props>>().toEqualTypeOf<
      'str' | 'num' | 'date' | 'union' | 'obj'
    >();
  });

  test('値の型で抽出する', () => {
    expectTypeOf<Keys<Props, string>>().toEqualTypeOf<'str'>();
    expectTypeOf<Keys<Props, string | number>>().toEqualTypeOf<
      'str' | 'num' | 'union'
    >();
    expectTypeOf<Keys<Props, object>>().toEqualTypeOf<'date' | 'obj'>();
    expectTypeOf<Keys<Props, boolean>>().toBeNever();
  });

  test('省略可能なプロパティを含む場合もundefinedが混ざらない', () => {
    expectTypeOf<Keys<OptionalProps>>().toEqualTypeOf<
      'str' | 'num' | 'undef' | 'req'
    >();
  });

  test('省略可能なプロパティは?で加わるundefinedを除いて判定する', () => {
    expectTypeOf<Keys<OptionalProps, string>>().toEqualTypeOf<
      'str' | 'undef' | 'req'
    >();
    expectTypeOf<Keys<OptionalProps, number>>().toEqualTypeOf<'num'>();
  });

  test('interfaceを指定できる', () => {
    expectTypeOf<Keys<InterfaceProps, string>>().toEqualTypeOf<'str'>();
  });
});
