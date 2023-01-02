import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import { getBanner, getExternals } from '../../rollup.config';
import pkg from './package.json';

const globals = {
  'prop-types': 'PropTypes',
  react: 'React',
  'simplebar-core': 'SimpleBar',
};

export default [
  {
    input: 'index.js',
    external: getExternals(pkg),
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      globals: globals,
      format: 'esm',
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      terser(),
      license(getBanner(pkg)),
    ],
  },
  {
    input: 'index.js',
    external: getExternals(pkg),
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      license(getBanner(pkg)),
    ],
  },
];
