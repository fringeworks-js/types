# @fringeworks/types

`@fringeworks/types` は TypeScript の型ユーティリティを集めた、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```sh
npm install @fringeworks/types
```

## 型一覧

### 値の状態を表す型

| 型        | 定義                                     | 説明                   |
| --------- | ---------------------------------------- | ---------------------- |
| `Nullish` | `undefined \| null`                      | null または undefined  |
| `Empty`   | `Nullish \| ''`                          | Nullish に加えて空文字 |
| `Falsy`   | `Empty \| false \| 0 \| -0 \| 0n \| NaN` | JavaScript の falsy 値 |

### レコード型

キーが `PropertyKey`（`string | number | symbol`）の汎用レコード型です。

| 型                  | 定義                      | 説明                                     |
| ------------------- | ------------------------- | ---------------------------------------- |
| `FlexibleRecord<V>` | `Record<PropertyKey, V>`  | 値の型をジェネリクスで指定できるベース型 |
| `LooseRecord`       | `FlexibleRecord<any>`     | 値の型を問わない柔軟性優先の型           |
| `StrictRecord`      | `FlexibleRecord<unknown>` | 使用時に型ガードが必要な型安全優先の型   |

### ディクショナリー型

キーが `string` のみのレコード型です。

| 型                      | 定義                          | 説明                                     |
| ----------------------- | ----------------------------- | ---------------------------------------- |
| `FlexibleDictionary<V>` | `Record<string, V>`           | 値の型をジェネリクスで指定できるベース型 |
| `LooseDictionary`       | `FlexibleDictionary<any>`     | 値の型を問わない柔軟性優先の型           |
| `StrictDictionary`      | `FlexibleDictionary<unknown>` | 使用時に型ガードが必要な型安全優先の型   |

### 配列型

| 型            | 定義        | 説明                                       |
| ------------- | ----------- | ------------------------------------------ |
| `LooseArray`  | `any[]`     | 要素の型を問わない柔軟性優先の配列型       |
| `StrictArray` | `unknown[]` | 使用時に型ガードが必要な型安全優先の配列型 |

### 同期関数型

| 型                                 | 説明                                            |
| ---------------------------------- | ----------------------------------------------- |
| `SyncFunction<P extends any[], R>` | 引数 `P` と戻り値 `R` を指定できるベース型      |
| `SyncLooseFunction`                | 引数・戻り値ともに `any` の柔軟性優先型         |
| `SyncStrictFunction`               | 引数 `never[]`・戻り値 `unknown` の型安全優先型 |

### 非同期関数型

| 型                                  | 説明                                                     |
| ----------------------------------- | -------------------------------------------------------- |
| `AsyncFunction<P extends any[], R>` | 引数 `P` と戻り値 `Promise<R>` を指定できるベース型      |
| `AsyncLooseFunction`                | 引数・戻り値ともに `any` の柔軟性優先型                  |
| `AsyncStrictFunction`               | 引数 `never[]`・戻り値 `Promise<unknown>` の型安全優先型 |

### イテレータ型

| 型                      | シグネチャ                                                        | 説明                                     |
| ----------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| `IndexedIteratee<V, R>` | `(value: V, index: number, data: V[]) => R`                       | 配列の繰り返し処理のコールバック         |
| `KeyedIteratee<V, R>`   | `(value: V, key: PropertyKey, data: Record<PropertyKey, V>) => R` | オブジェクトの繰り返し処理のコールバック |

## 高度なユーティリティ型

### `Keys<RECORD, TYPE>`

レコードのキーのユニオン型を生成します。`TYPE` を指定するとその型の値を持つキーのみを抽出します。

```ts
import type { Keys } from '@fringeworks/types';

type Props = {
  id: number;
  name: string;
  label: string;
  createdAt: Date;
};

// 全キーのユニオン型
type AllKeys = Keys<Props>;
// => 'id' | 'name' | 'label' | 'createdAt'

// string 型の値を持つキーのみ
type StringKeys = Keys<Props, string>;
// => 'name' | 'label'
```

### `Prefixed<PREFIX, RECORD, KEYS>`

レコードの指定プロパティにキャメルケースでプレフィックスを付与した新しい型を生成します。\
`KEYS` を省略すると全プロパティが対象になります。

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

### `PrefixedUnion<PREFIX, UNION, KEYS>`

ユニオン型の値にキャメルケースでプレフィックスを付与した新しいユニオン型を生成します。\
`KEYS` を省略すると全ての値が対象になります。

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

## ライセンス

MIT
