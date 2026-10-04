/**
 * undefined,null
 */
export type Nullish = undefined | null;

/**
 * undefined,null,空文字
 */
export type Empty = Nullish | '';

/**
 * falsy
 */
export type Falsy = Empty | false | 0 | -0 | 0n | typeof NaN;

/**
 *キーは文字列・数値・シンボル、値の型は指定可能な汎用レコード型
 */
export type FlexibleRecord<V = unknown> = Record<PropertyKey, V>;

/**
 * キーは文字列・数値・シンボルの汎用的なレコード型
 * 型安全性よりも柔軟性を優先する場合に使用
 */
export type LooseRecord = FlexibleRecord<any>;

/**
 * キーは文字列・数値・シンボルの型安全な汎用オブジェクト型
 * 使用時に型ガードが必要な場合に使用
 */
export type StrictRecord = FlexibleRecord<unknown>;

/**
 *キーは文字列のみ、値の型は指定可能な汎用ディクショナリー型
 */
export type FlexibleDictionary<V = unknown> = Record<string, V>;

/**
 * キーは文字列のみの汎用的なディクショナリー型
 * 型安全性よりも柔軟性を優先する場合に使用
 */
export type LooseDictionary = FlexibleDictionary<any>;

/**
 * キーは文字列のみの型安全な汎用ディクショナリー型
 * 使用時に型ガードが必要な場合に使用
 */
export type StrictDictionary = FlexibleDictionary<unknown>;

/**
 * 汎用的な配列型
 * 型安全性よりも柔軟性を優先する場合に使用
 */
export type LooseArray = any[];

/**
 * 型安全な配列型
 * 使用時に型ガードが必要な場合に使用
 */
export type StrictArray = unknown[];

/**
 * 引数と戻り値の型を指定可能な、柔軟な関数定義のベース型
 * @template P 引数の型（タプルの配列形式、デフォルトは never[]）
 * @template R 戻り値の型（デフォルトは unknown）
 */
export type SyncFunction<P extends any[] = never[], R = unknown> = (
  ...args: P
) => R;

/**
 * 型安全性よりも柔軟性を優先した関数型
 * どんな引数でも受け入れ、戻り値も `any` として自由に扱える
 * 既存のJavaScriptライブラリとの連携や、型定義を緩くする場合に使用する。
 */
export type SyncLooseFunction = SyncFunction<any[], any>;

/**
 * 型安全性を最優先した関数型
 * 引数を受け取ることができず、戻り値も `unknown` となるため、
 * 使用する際には適切な型ガードや型アサーションを強制する。
 */
export type SyncStrictFunction = SyncFunction<never[], unknown>;

/**
 * 引数と戻り値の型を指定可能な、柔軟な関数定義のベース型
 * @template P 引数の型（タプルの配列形式、デフォルトは never[]）
 * @template R 戻り値の型（デフォルトは unknown）
 */
export type AsyncFunction<P extends any[] = never[], R = unknown> = (
  ...args: P
) => Promise<R>;

/**
 * 型安全性よりも柔軟性を優先した関数型
 * どんな引数でも受け入れ、戻り値も `any` として自由に扱える
 * 既存のJavaScriptライブラリとの連携や、型定義を緩くする場合に使用する。
 */
export type AsyncLooseFunction = AsyncFunction<any[], any>;

/**
 * 型安全性を最優先した関数型
 * 引数を受け取ることができず、戻り値も `unknown` となるため、
 * 使用する際には適切な型ガードや型アサーションを強制する。
 */
export type AsyncStrictFunction = AsyncFunction<never[], unknown>;

/**
 * 配列の繰り返し処理時に渡す一般的なコールバック関数
 */
export type IndexedIteratee<V, R> = (value: V, index: number, data: V[]) => R;

/**
 * オブジェクトの繰り返し処理時に渡す一般的なコールバック関数
 */
export type KeyedIteratee<V, R> = (
  value: V,
  key: PropertyKey,
  data: Record<PropertyKey, V>,
) => R;

/**
 * プロパティの合成
 */
export type Composition<
  BASE extends LooseDictionary,
  ADDED extends LooseDictionary,
> = Omit<BASE, keyof ADDED> & ADDED;
