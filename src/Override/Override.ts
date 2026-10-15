/**
 * BASEのプロパティをOVERRIDESのプロパティで上書きする（同名のプロパティはOVERRIDESの型になる）
 * @template BASE 元のレコード
 * @template OVERRIDES 上書きするプロパティを持つレコード
 */
export type Override<BASE extends object, OVERRIDES extends object> = Omit<
  BASE,
  keyof OVERRIDES
> &
  OVERRIDES;
