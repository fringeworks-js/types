/**
 * 指定のプロパティにキャメルケースでプレフィックスを付与する
 * 数値・シンボルのキーはプレフィックスを付与せず、そのまま残す
 * @template PREFIX プロパティに付与するプレフィックス
 * @template RECORD プロパティを持つレコード
 * @template KEYS 対象のプロパティ。未指定の場合は全てのプロパティ
 */
export type Prefixed<
  PREFIX extends string,
  RECORD extends object,
  KEYS extends keyof RECORD = keyof RECORD,
> = {
  [
    KEY in keyof RECORD as KEY extends KEYS & string
      ? `${PREFIX}${Capitalize<KEY>}`
      : KEY
  ]: RECORD[KEY];
};
