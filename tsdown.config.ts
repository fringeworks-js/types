import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  // 型のみのモジュールから空のJSを出力しないよう、index.tsから辿れるものだけをビルドする
  entry: ['src/index.ts'],
  // 型は全てルートから export するため、サブパスは作らない
  exports: {
    exclude: [{ valueType: 'path', entryType: 'dir', conditions: /^src\/./ }],
  },
});
