# @fringeworks/types

`@fringeworks/types` is a library some will find handy, offering TypeScript utility types and constants that enumerate the values of a type.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```sh
npm install @fringeworks/types
```

## Types and Constants

### Value types

| Type        | Definition                                                   | Description                               |
| ----------- | ------------------------------------------------------------ | ----------------------------------------- |
| `Nullish`   | `undefined \| null`                                          | null or undefined                         |
| `Primitive` | `Nullish \| boolean \| number \| bigint \| string \| symbol` | Primitive values                          |
| `Empty`     | `Nullish \| ''`                                              | Nullish plus empty string                 |
| `Falsy`     | `Empty \| false \| 0 \| 0n`                                  | JavaScript falsy values (excluding `NaN`) |

`Falsy` does not include `NaN`, because `NaN` has no literal type and could only be expressed by including all of `number`. `-0` is the same as `0` at the type level.

### Constants

Constants that enumerate the possible values of a type. A type with the same name is also exported, so each can be used both as a value and as a type.

| Constant         | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `ToStringResult` | Results of `Object.prototype.toString.call(value)` for the major built-in objects |
| `TypeOfResult`   | Results of `typeof`                                                               |

```ts
import { ToStringResult, TypeOfResult } from '@fringeworks/types';

// Use as a value
Object.prototype.toString.call([]) === ToStringResult.Array; // => true

// Use as a type
function getType(value: unknown): TypeOfResult {
  return typeof value;
}
```

### Record types

Generic record types whose keys are `PropertyKey` (`string | number | symbol`). To specify the value type, use `Record<PropertyKey, VALUE>` directly.

| Type           | Definition                     | Description                                         |
| -------------- | ------------------------------ | --------------------------------------------------- |
| `LooseRecord`  | `Record<PropertyKey, any>`     | Flexibility-first type that accepts any value type  |
| `StrictRecord` | `Record<PropertyKey, unknown>` | Safety-first type that requires a type guard to use |

### Dictionary types

Record types whose keys are `string` only. To specify the value type, use `Record<string, VALUE>` directly.

| Type               | Definition                | Description                                         |
| ------------------ | ------------------------- | --------------------------------------------------- |
| `LooseDictionary`  | `Record<string, any>`     | Flexibility-first type that accepts any value type  |
| `StrictDictionary` | `Record<string, unknown>` | Safety-first type that requires a type guard to use |

### Array types

| Type          | Definition  | Description                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `LooseArray`  | `any[]`     | Flexibility-first array type that accepts any element     |
| `StrictArray` | `unknown[]` | Safety-first array type that requires a type guard to use |

### Synchronous function types

| Type                           | Description                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `SyncFunction<PARAMS, RESULT>` | Base type with configurable parameter type `PARAMS` (a tuple, default `never[]`) and return type `RESULT` (default `unknown`) |
| `LooseSyncFunction`            | Flexibility-first type with `any` parameters and return value                                                                 |
| `StrictSyncFunction`           | Safety-first type with `never[]` parameters and `unknown` return value. Same as `SyncFunction` with the defaults              |

### Asynchronous function types

| Type                            | Description                                                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `AsyncFunction<PARAMS, RESULT>` | Base type with configurable parameter type `PARAMS` (a tuple, default `never[]`) and return `Promise<RESULT>` (`RESULT` defaults to `unknown`) |
| `LooseAsyncFunction`            | Flexibility-first type with `any` parameters and return value                                                                                  |
| `StrictAsyncFunction`           | Safety-first type with `never[]` parameters and `Promise<unknown>` return value. Same as `AsyncFunction` with the defaults                     |

### Iteratee types

| Type                             | Signature                                                         | Description                        |
| -------------------------------- | ----------------------------------------------------------------- | ---------------------------------- |
| `IndexedIteratee<VALUE, RESULT>` | `(value: VALUE, index: number, data: readonly VALUE[]) => RESULT` | Callback for iterating over arrays |

## Advanced utility types

### `Keys<RECORD, TYPE>`

Generates a union type of the keys of a record. When `TYPE` is specified, only keys whose values extend that type are included.\
Optional properties are checked by their value type without the `undefined` added by `?`.

```ts
import type { Keys } from '@fringeworks/types';

type Props = {
  id: number;
  name: string;
  label: string;
  createdAt: Date;
  note?: string;
};

// Union of all keys
type AllKeys = Keys<Props>;
// => 'id' | 'name' | 'label' | 'createdAt' | 'note'

// Only keys whose value is string
type StringKeys = Keys<Props, string>;
// => 'name' | 'label' | 'note'
```

### `Prefixed<PREFIX, RECORD, KEYS>`

Generates a new type by prepending a camelCase prefix to the specified properties of a record.\
When `KEYS` is omitted, all properties are targeted. Numeric and symbol keys are kept as they are, without a prefix.

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

### `PrefixedUnion<PREFIX, UNION, MEMBERS>`

Generates a new union type by prepending a camelCase prefix to the members of a union.\
When `MEMBERS` is omitted, all members are targeted. Non-string members are kept as they are, without a prefix.

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

### `Override<BASE, OVERRIDES>`

Generates a type in which the properties of `BASE` are overridden by those of `OVERRIDES`. Properties with the same name take their type from `OVERRIDES`.

```ts
import type { Override } from '@fringeworks/types';

type Base = { id: number; name: string };

type Props = Override<Base, { id: string; label: string }>;
// => { name: string } & { id: string; label: string }
```

## License

MIT
