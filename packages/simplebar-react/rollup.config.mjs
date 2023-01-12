import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { getBanner, getExternals, tsConfig } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const globals = {
  react: 'React',
  'simplebar-core': 'SimpleBarCore',
};

export default [
  {
    input: 'index.tsx',
    external: getExternals(pkg),
    output: {
      name: 'SimpleBarReact',
      file: pkg.main,
      globals: globals,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      typescript({ ...tsConfig, tsconfig: './tsconfig.json' }),
      license(getBanner(pkg)),
    ],
  },
  {
    input: 'index.tsx',
    external: getExternals(pkg),
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      typescript({ ...tsConfig, tsconfig: './tsconfig.json' }),
      license(getBanner(pkg)),
    ],
  },
];
