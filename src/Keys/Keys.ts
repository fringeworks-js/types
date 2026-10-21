/**
 * レコードのキーのユニオン型を作る
 * TYPEに型を指定すると、その型の値を持つキーのみを抽出したユニオン型を作る\
 * 省略可能なプロパティは、`?`によって加わる`undefined`を除いた値の型で判定する
 *
 * @template RECORD 対象のレコード
 * @template TYPE 対象の値の型
 */
export type Keys<RECORD extends object, TYPE = unknown> = {
  [KEY in keyof RECORD]-?: Required<RECORD>[KEY] extends TYPE ? KEY : never;
}[keyof RECORD];
