import { createRequire } from 'node:module';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { getExternals, getBanner, tsConfig } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [
  // ES module (for bundlers) build
  {
    input: 'src/index.ts',
    external: getExternals(pkg),
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [typescript(tsConfig), license(getBanner(pkg))],
  },
  // CommonJS (for Node)
  {
    input: 'src/index.ts',
    external: getExternals(pkg),
    output: [
      {
        name: 'SimpleBarCore',
        file: pkg.main,
        format: 'umd',
        sourcemap: true,
        globals: {
          'can-use-dom': 'canUseDOM',
          'lodash-es': '_',
        },
        paths: {
          // Lodash-es won't work for UMD build, so we alias to lodash
          'lodash-es': 'lodash',
        },
      },
    ],
    plugins: [typescript(tsConfig), license(getBanner(pkg))],
  },
];
