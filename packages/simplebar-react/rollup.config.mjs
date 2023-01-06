import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { getBanner, getExternals } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const globals = {
  'prop-types': 'PropTypes',
  react: 'React',
  'simplebar-core': 'SimpleBar',
};

export default [
  {
    input: 'index.tsx',
    external: getExternals(pkg),
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      globals: globals,
      format: 'esm',
    },
    plugins: [
      typescript({ tsconfig: '../../tsconfig.json' }),
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
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      typescript({ tsconfig: '../../tsconfig.json' }),
      license(getBanner(pkg)),
    ],
  },
];
