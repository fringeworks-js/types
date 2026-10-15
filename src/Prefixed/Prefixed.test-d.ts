import type { Prefixed } from './Prefixed';

type Props = {
  str: string;
  num: number;
  obj: { str: string };
};

type OptionalProps = {
  str?: string;
  num?: number;
};

interface InterfaceProps {
  str: string;
}

describe('Prefixed', () => {
  test('全てのプロパティ', () => {
    expectTypeOf<Prefixed<'x', Props>>().toEqualTypeOf<{
      xStr: string;
      xNum: number;
      xObj: { str: string };
    }>();
  });

  test('一部のプロパティ', () => {
    expectTypeOf<Prefixed<'x', Props, 'str' | 'obj'>>().toEqualTypeOf<{
      xStr: string;
      num: number;
      xObj: { str: string };
    }>();
  });

  test('省略可能かどうかを引き継ぐ', () => {
    expectTypeOf<Prefixed<'x', OptionalProps, 'str'>>().toEqualTypeOf<{
      xStr?: string;
      num?: number;
    }>();
  });

  test('数値・シンボルのキーはそのまま残す', () => {
    const sym = Symbol('sym');
    type Mixed = { 0: string; [sym]: boolean; str: number };
    expectTypeOf<Prefixed<'x', Mixed>>().toEqualTypeOf<{
      0: string;
      [sym]: boolean;
      xStr: number;
    }>();
  });

  test('interfaceを指定できる', () => {
    expectTypeOf<Prefixed<'x', InterfaceProps>>().toEqualTypeOf<{
      xStr: string;
    }>();
  });
});
