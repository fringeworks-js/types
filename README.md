# @fringeworks/types

`@fringeworks/types` is a library some will find handy, offering TypeScript utility types.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```sh
npm install @fringeworks/types
```

## Type Reference

### Value state types

| Type      | Definition                               | Description                 |
| --------- | ---------------------------------------- | --------------------------- |
| `Nullish` | `undefined \| null`                      | null or undefined           |
| `Empty`   | `Nullish \| ''`                          | Nullish plus empty string   |
| `Falsy`   | `Empty \| false \| 0 \| -0 \| 0n \| NaN` | All JavaScript falsy values |

### Record types

Generic record types whose keys are `PropertyKey` (`string | number | symbol`).

| Type                | Definition                | Description                                         |
| ------------------- | ------------------------- | --------------------------------------------------- |
| `FlexibleRecord<V>` | `Record<PropertyKey, V>`  | Base type with a generic value type                 |
| `LooseRecord`       | `FlexibleRecord<any>`     | Flexibility-first type that accepts any value type  |
| `StrictRecord`      | `FlexibleRecord<unknown>` | Safety-first type that requires a type guard to use |

### Dictionary types

Record types whose keys are `string` only.

| Type                    | Definition                    | Description                                         |
| ----------------------- | ----------------------------- | --------------------------------------------------- |
| `FlexibleDictionary<V>` | `Record<string, V>`           | Base type with a generic value type                 |
| `LooseDictionary`       | `FlexibleDictionary<any>`     | Flexibility-first type that accepts any value type  |
| `StrictDictionary`      | `FlexibleDictionary<unknown>` | Safety-first type that requires a type guard to use |

### Array types

| Type          | Definition  | Description                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `LooseArray`  | `any[]`     | Flexibility-first array type that accepts any element     |
| `StrictArray` | `unknown[]` | Safety-first array type that requires a type guard to use |

### Synchronous function types

| Type                               | Description                                                            |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `SyncFunction<P extends any[], R>` | Base type with configurable parameter type `P` and return type `R`     |
| `SyncLooseFunction`                | Flexibility-first type with `any` parameters and return value          |
| `SyncStrictFunction`               | Safety-first type with `never[]` parameters and `unknown` return value |

### Asynchronous function types

| Type                                | Description                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `AsyncFunction<P extends any[], R>` | Base type with configurable parameter type `P` and return `Promise<R>`          |
| `AsyncLooseFunction`                | Flexibility-first type with `any` parameters and return value                   |
| `AsyncStrictFunction`               | Safety-first type with `never[]` parameters and `Promise<unknown>` return value |

### Iteratee types

| Type                    | Signature                                                         | Description                         |
| ----------------------- | ----------------------------------------------------------------- | ----------------------------------- |
| `IndexedIteratee<V, R>` | `(value: V, index: number, data: V[]) => R`                       | Callback for iterating over arrays  |
| `KeyedIteratee<V, R>`   | `(value: V, key: PropertyKey, data: Record<PropertyKey, V>) => R` | Callback for iterating over objects |

## Advanced utility types

### `Keys<RECORD, TYPE>`

Generates a union type of the keys of a record. When `TYPE` is specified, only keys whose values extend that type are included.

```ts
import type { Keys } from '@fringeworks/types';

type Props = {
  id: number;
  name: string;
  label: string;
  createdAt: Date;
};

// Union of all keys
type AllKeys = Keys<Props>;
// => 'id' | 'name' | 'label' | 'createdAt'

// Only keys whose value is string
type StringKeys = Keys<Props, string>;
// => 'name' | 'label'
```

### `Prefixed<PREFIX, RECORD, KEYS>`

Generates a new type by prepending a camelCase prefix to the specified properties of a record.\
When `KEYS` is omitted, all properties are targeted.

```ts
import type { Prefixed } from '@fringeworks/types';

type Props = {
  width: number;
  height: number;
  color: string;
};

// Prefix all properties
type PrefixedProps = Prefixed<'default', Props>;
// => { defaultWidth: number; defaultHeight: number; defaultColor: string }

// Prefix only selected properties
type PartialPrefixedProps = Prefixed<'default', Props, 'width' | 'height'>;
// => { defaultWidth: number; defaultHeight: number; color: string }
```

### `PrefixedUnion<PREFIX, UNION, KEYS>`

Generates a new union type by prepending a camelCase prefix to the members of a union.\
When `KEYS` is omitted, all members are targeted.

```ts
import type { PrefixedUnion } from '@fringeworks/types';

type Direction = 'top' | 'right' | 'bottom' | 'left';

// Prefix all members
type PaddingKeys = PrefixedUnion<'padding', Direction>;
// => 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'

// Prefix only selected members
type PartialMarginKeys = PrefixedUnion<'margin', Direction, 'top' | 'bottom'>;
// => 'marginTop' | 'right' | 'marginBottom' | 'left'
```

## License

MIT
