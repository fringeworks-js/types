/**
 * ユニオン型の値にキャメルケースでプレフィックスを付与する
 * 文字列以外の値はプレフィックスを付与せず、そのまま残す
 * @template PREFIX ユニオン型の値に付与するプレフィックス
 * @template UNION ユニオン型
 * @template MEMBERS 対象のユニオン型の値。未指定の場合は全てのユニオン型の値
 */
export type PrefixedUnion<
  PREFIX extends string,
  UNION,
  MEMBERS extends UNION = UNION,
> = UNION extends MEMBERS & string ? `${PREFIX}${Capitalize<UNION>}` : UNION;
