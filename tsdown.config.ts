import createExternal from '@fringeworks/dev/createExternal';
import distPackage from '@fringeworks/rollup-plugin-dist-package';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'tsdown';

export default defineConfig({
  // 型のみのモジュールから空のJSを出力しないよう、index.tsから辿れるものだけをビルドする
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  inputOptions: {
    external: createExternal(),
  },
  outputOptions: {
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    distPackage({
      content: {
        main: './index.cjs',
        module: './index.mjs',
        types: './index.d.cts',
        sideEffects: false,
        exports: {
          '.': {
            import: { types: './index.d.mts', default: './index.mjs' },
            require: { types: './index.d.cts', default: './index.cjs' },
          },
          './package.json': './package.json',
        },
      },
      resolveWorkspaceDeps: true,
      range: '^',
    }),
    copy({
      targets: [
        {
          src: ['LICENSE', 'README.md', 'README.ja.md'],
          dest: 'dist',
        },
      ],
    }),
  ],
});
