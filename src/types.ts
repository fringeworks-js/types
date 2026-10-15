// ---- 値の型 ----

/**
 * undefined,null
 */
export type Nullish = undefined | null;

/**
 * プリミティブ値
 */
export type Primitive = Nullish | boolean | number | bigint | string | symbol;

/**
 * undefined,null,空文字
 */
export type Empty = Nullish | '';

/**
 * falsy
 * `NaN`はリテラル型が無く、`number`全体を含めないと表せないため含めない\
 * `-0`は型の上では`0`と同じになる
 */
export type Falsy = Empty | false | 0 | 0n;

// ---- レコード型 ----

/**
 * キーは文字列・数値・シンボル、値の型は指定可能な汎用レコード型
 * @template VALUE 値の型
 */
export type FlexibleRecord<VALUE = unknown> = Record<PropertyKey, VALUE>;

/**
 * キーは文字列・数値・シンボルの汎用的なレコード型
 * 型安全性よりも柔軟性を優先する場合に使用
 */
export type LooseRecord = FlexibleRecord<any>;

/**
 * キーは文字列・数値・シンボルの型安全な汎用レコード型
 * 使用時に型ガードが必要な場合に使用
 */
export type StrictRecord = FlexibleRecord<unknown>;

// ---- ディクショナリー型 ----

/**
 * キーは文字列のみ、値の型は指定可能な汎用ディクショナリー型
 * @template VALUE 値の型
 */
export type FlexibleDictionary<VALUE = unknown> = Record<string, VALUE>;

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

// ---- 配列型 ----

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

// ---- 同期関数型 ----

/**
 * 引数と戻り値の型を指定可能な、同期関数のベース型
 * @template PARAMS 引数の型（タプルの配列形式、デフォルトは never[]）
 * @template RESULT 戻り値の型（デフォルトは unknown）
 */
export type SyncFunction<PARAMS extends any[] = never[], RESULT = unknown> = (
  ...args: PARAMS
) => RESULT;

/**
 * 型安全性よりも柔軟性を優先した同期関数型
 * どんな引数でも受け入れ、戻り値も `any` として自由に扱える
 * 既存のJavaScriptライブラリとの連携や、型定義を緩くする場合に使用する。
 */
export type SyncLooseFunction = SyncFunction<any[], any>;

/**
 * 型安全性を最優先した同期関数型
 * 引数を受け取ることができず、戻り値も `unknown` となるため、
 * 使用する際には適切な型ガードや型アサーションを強制する。
 */
export type SyncStrictFunction = SyncFunction<never[], unknown>;

// ---- 非同期関数型 ----

/**
 * 引数と戻り値の型を指定可能な、非同期関数のベース型
 * @template PARAMS 引数の型（タプルの配列形式、デフォルトは never[]）
 * @template RESULT 戻り値の`Promise`が解決する型（デフォルトは unknown）
 */
export type AsyncFunction<PARAMS extends any[] = never[], RESULT = unknown> = (
  ...args: PARAMS
) => Promise<RESULT>;

/**
 * 型安全性よりも柔軟性を優先した非同期関数型
 * どんな引数でも受け入れ、`Promise`の解決値も `any` として自由に扱える
 * 既存のJavaScriptライブラリとの連携や、型定義を緩くする場合に使用する。
 */
export type AsyncLooseFunction = AsyncFunction<any[], any>;

/**
 * 型安全性を最優先した非同期関数型
 * 引数を受け取ることができず、`Promise`の解決値も `unknown` となるため、
 * 使用する際には適切な型ガードや型アサーションを強制する。
 */
export type AsyncStrictFunction = AsyncFunction<never[], unknown>;

// ---- イテレーター型 ----

/**
 * 配列の繰り返し処理時に渡す一般的なコールバック関数
 * @template VALUE 要素の型
 * @template RESULT 戻り値の型
 */
export type IndexedIteratee<VALUE, RESULT> = (
  value: VALUE,
  index: number,
  data: readonly VALUE[],
) => RESULT;

/**
 * オブジェクトの繰り返し処理時に渡す一般的なコールバック関数
 * @template VALUE 値の型
 * @template RESULT 戻り値の型
 * @template KEY キーの型（デフォルトは`Object.keys`などと同じ string）
 */
export type KeyedIteratee<VALUE, RESULT, KEY extends PropertyKey = string> = (
  value: VALUE,
  key: KEY,
  data: Readonly<Record<KEY, VALUE>>,
) => RESULT;
