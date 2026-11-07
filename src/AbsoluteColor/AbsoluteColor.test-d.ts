import type {
  AbsoluteColor,
  FunctionalColor,
  HexColor,
  NamedColor,
} from './AbsoluteColor';

describe('HexColor', () => {
  test('# で始まる文字列を受け付ける', () => {
    expectTypeOf<'#2f6fde'>().toExtend<HexColor>();
    expectTypeOf<'#FFF'>().toExtend<HexColor>();
  });

  test('# で始まらないものは受け付けない', () => {
    expectTypeOf<'2f6fde'>().not.toExtend<HexColor>();
    expectTypeOf<'red'>().not.toExtend<HexColor>();
  });
});

describe('FunctionalColor', () => {
  test('具体的な色を表す色の関数を受け付ける', () => {
    expectTypeOf<'rgb(47 111 222)'>().toExtend<FunctionalColor>();
    expectTypeOf<'hsla(220, 70%, 53%, 0.5)'>().toExtend<FunctionalColor>();
    expectTypeOf<'oklch(0.55 0.18 260)'>().toExtend<FunctionalColor>();
    expectTypeOf<'color(display-p3 0.2 0.4 0.9)'>().toExtend<FunctionalColor>();
  });

  test('ほかの関数は受け付けない', () => {
    expectTypeOf<'var(--brand)'>().not.toExtend<FunctionalColor>();
    expectTypeOf<'color-mix(in oklch, red, blue)'>().not.toExtend<FunctionalColor>();
    expectTypeOf<'#2f6fde'>().not.toExtend<FunctionalColor>();
  });
});

describe('NamedColor', () => {
  test('CSS の色の名前と transparent を受け付ける', () => {
    expectTypeOf<'red'>().toExtend<NamedColor>();
    expectTypeOf<'rebeccapurple'>().toExtend<NamedColor>();
    expectTypeOf<'transparent'>().toExtend<NamedColor>();
  });

  test('色の名前でないものは受け付けない', () => {
    expectTypeOf<'currentcolor'>().not.toExtend<NamedColor>();
    expectTypeOf<'Red'>().not.toExtend<NamedColor>();
    expectTypeOf<string>().not.toExtend<NamedColor>();
  });
});

describe('AbsoluteColor', () => {
  test('16進数の色・色の関数・色の名前を受け付ける', () => {
    expectTypeOf<'#2f6fde'>().toExtend<AbsoluteColor>();
    expectTypeOf<'#FFF'>().toExtend<AbsoluteColor>();
    expectTypeOf<'rgb(47 111 222)'>().toExtend<AbsoluteColor>();
    expectTypeOf<'rgba(0, 0, 0, 0.5)'>().toExtend<AbsoluteColor>();
    expectTypeOf<'hsl(220 70% 53%)'>().toExtend<AbsoluteColor>();
    expectTypeOf<'oklch(0.55 0.18 260)'>().toExtend<AbsoluteColor>();
    expectTypeOf<'color(display-p3 0.2 0.4 0.9)'>().toExtend<AbsoluteColor>();
    expectTypeOf<'red'>().toExtend<AbsoluteColor>();
  });

  test('描くときまで決まらない値は受け付けない', () => {
    expectTypeOf<'var(--brand)'>().not.toExtend<AbsoluteColor>();
    expectTypeOf<'currentColor'>().not.toExtend<AbsoluteColor>();
    expectTypeOf<'inherit'>().not.toExtend<AbsoluteColor>();
    expectTypeOf<'color-mix(in oklch, red, blue)'>().not.toExtend<AbsoluteColor>();
    expectTypeOf<string>().not.toExtend<AbsoluteColor>();
  });
});
