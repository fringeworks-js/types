# @fringeworks/types

`@fringeworks/types` は TypeScript の型ユーティリティと、型の値を列挙した定数を集めた、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```sh
npm install @fringeworks/types
```

## 型・定数一覧

### 値の型

| 型          | 定義                                                         | 説明                                   |
| ----------- | ------------------------------------------------------------ | -------------------------------------- |
| `Nullish`   | `undefined \| null`                                          | null または undefined                  |
| `Primitive` | `Nullish \| boolean \| number \| bigint \| string \| symbol` | プリミティブ値                         |
| `Empty`     | `Nullish \| ''`                                              | Nullish に加えて空文字                 |
| `Falsy`     | `Empty \| false \| 0 \| 0n`                                  | JavaScript の falsy 値（`NaN` を除く） |

`NaN` はリテラル型が無く、`number` 全体を含めないと表せないため `Falsy` に含めていません。`-0` は型の上では `0` と同じです。

### 定数

型の取りうる値を列挙した定数です。同じ名前の型も export しているため、値と型のどちらとしても使えます。

| 定数             | 説明                                                                       |
| ---------------- | -------------------------------------------------------------------------- |
| `ToStringResult` | `Object.prototype.toString.call(value)` の主要な組み込みオブジェクトの結果 |
| `TypeOfResult`   | `typeof` の結果                                                            |

```ts
import { ToStringResult, TypeOfResult } from '@fringeworks/types';

// 値として使う
Object.prototype.toString.call([]) === ToStringResult.Array; // => true

// 型として使う
function getType(value: unknown): TypeOfResult {
  return typeof value;
}
```

### レコード型

キーが `PropertyKey`（`string | number | symbol`）の汎用レコード型です。

| 型                      | 定義                         | 説明                                     |
| ----------------------- | ---------------------------- | ---------------------------------------- |
| `FlexibleRecord<VALUE>` | `Record<PropertyKey, VALUE>` | 値の型をジェネリクスで指定できるベース型 |
| `LooseRecord`           | `FlexibleRecord<any>`        | 値の型を問わない柔軟性優先の型           |
| `StrictRecord`          | `FlexibleRecord<unknown>`    | 使用時に型ガードが必要な型安全優先の型   |

### ディクショナリー型

キーが `string` のみのレコード型です。

| 型                          | 定義                          | 説明                                     |
| --------------------------- | ----------------------------- | ---------------------------------------- |
| `FlexibleDictionary<VALUE>` | `Record<string, VALUE>`       | 値の型をジェネリクスで指定できるベース型 |
| `LooseDictionary`           | `FlexibleDictionary<any>`     | 値の型を問わない柔軟性優先の型           |
| `StrictDictionary`          | `FlexibleDictionary<unknown>` | 使用時に型ガードが必要な型安全優先の型   |

### 配列型

| 型            | 定義        | 説明                                       |
| ------------- | ----------- | ------------------------------------------ |
| `LooseArray`  | `any[]`     | 要素の型を問わない柔軟性優先の配列型       |
| `StrictArray` | `unknown[]` | 使用時に型ガードが必要な型安全優先の配列型 |

### 同期関数型

| 型                                           | 説明                                                 |
| -------------------------------------------- | ---------------------------------------------------- |
| `SyncFunction<PARAMS extends any[], RESULT>` | 引数 `PARAMS` と戻り値 `RESULT` を指定できるベース型 |
| `SyncLooseFunction`                          | 引数・戻り値ともに `any` の柔軟性優先型              |
| `SyncStrictFunction`                         | 引数 `never[]`・戻り値 `unknown` の型安全優先型      |

### 非同期関数型

| 型                                            | 説明                                                          |
| --------------------------------------------- | ------------------------------------------------------------- |
| `AsyncFunction<PARAMS extends any[], RESULT>` | 引数 `PARAMS` と戻り値 `Promise<RESULT>` を指定できるベース型 |
| `AsyncLooseFunction`                          | 引数・戻り値ともに `any` の柔軟性優先型                       |
| `AsyncStrictFunction`                         | 引数 `never[]`・戻り値 `Promise<unknown>` の型安全優先型      |

### イテレーター型

| 型                                   | シグネチャ                                                               | 説明                                     |
| ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------- |
| `IndexedIteratee<VALUE, RESULT>`     | `(value: VALUE, index: number, data: readonly VALUE[]) => RESULT`        | 配列の繰り返し処理のコールバック         |
| `KeyedIteratee<VALUE, RESULT, KEY?>` | `(value: VALUE, key: KEY, data: Readonly<Record<KEY, VALUE>>) => RESULT` | オブジェクトの繰り返し処理のコールバック |

`KeyedIteratee` の `KEY` は `PropertyKey` の部分型で、省略すると `Object.keys` などと同じ `string` になります。

## 高度なユーティリティ型

### `Keys<RECORD, TYPE>`

レコードのキーのユニオン型を生成します。`TYPE` を指定するとその型の値を持つキーのみを抽出します。\
省略可能なプロパティは、`?` によって加わる `undefined` を除いた値の型で判定します。

```ts
import type { Keys } from '@fringeworks/types';

type Props = {
  id: number;
  name: string;
  label: string;
  createdAt: Date;
  note?: string;
};

// 全キーのユニオン型
type AllKeys = Keys<Props>;
// => 'id' | 'name' | 'label' | 'createdAt' | 'note'

// string 型の値を持つキーのみ
type StringKeys = Keys<Props, string>;
// => 'name' | 'label' | 'note'
```

### `Prefixed<PREFIX, RECORD, KEYS>`

レコードの指定プロパティにキャメルケースでプレフィックスを付与した新しい型を生成します。\
`KEYS` を省略すると全プロパティが対象になります。数値・シンボルのキーにはプレフィックスを付与せず、そのまま残します。

```ts
import type { Prefixed } from '@fringeworks/types';

type Props = {
  width: number;
  height: number;
  color: string;
};

// 全プロパティにプレフィックス
type PrefixedProps = Prefixed<'default', Props>;
// => { defaultWidth: number; defaultHeight: number; defaultColor: string }

// 一部のプロパティのみプレフィックス
type PartialPrefixedProps = Prefixed<'default', Props, 'width' | 'height'>;
// => { defaultWidth: number; defaultHeight: number; color: string }
```

### `PrefixedUnion<PREFIX, UNION, MEMBERS>`

ユニオン型の値にキャメルケースでプレフィックスを付与した新しいユニオン型を生成します。\
`MEMBERS` を省略すると全ての値が対象になります。文字列以外の値にはプレフィックスを付与せず、そのまま残します。

```ts
import type { PrefixedUnion } from '@fringeworks/types';

type Direction = 'top' | 'right' | 'bottom' | 'left';

// 全ての値にプレフィックス
type PaddingKeys = PrefixedUnion<'padding', Direction>;
// => 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'

// 一部の値のみプレフィックス
type PartialMarginKeys = PrefixedUnion<'margin', Direction, 'top' | 'bottom'>;
// => 'marginTop' | 'right' | 'marginBottom' | 'left'
```

### `Override<BASE, OVERRIDES>`

`BASE` のプロパティを `OVERRIDES` のプロパティで上書きした型を生成します。同名のプロパティは `OVERRIDES` の型になります。

```ts
import type { Override } from '@fringeworks/types';

type Base = { id: number; name: string };

type Props = Override<Base, { id: string; label: string }>;
// => { name: string } & { id: string; label: string }
```

## ライセンス

MIT
