import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { getBanner, getExternals, tsConfig } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const globals = {
  'simplebar-core': 'SimpleBar',
};

export default [
  {
    input: 'index.ts',
    output: {
      name: 'SimpleBarVue',
      file: pkg.main,
      globals: globals,
      format: 'umd',
      sourcemap: true,
    },
    external: getExternals(pkg),
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      typescript(tsConfig),
      license(getBanner(pkg)),
    ],
  },
  {
    input: 'index.ts',
    external: getExternals(pkg),
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [typescript(tsConfig), license(getBanner(pkg))],
  },
];
