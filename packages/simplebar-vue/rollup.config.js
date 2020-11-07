import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import { getBanner, getExternals } from '../../rollup.config';
import pkg from './package.json';

const globals = {
  'simplebar-core': 'SimpleBar',
};

export default [
  {
    input: 'index.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      globals: globals,
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]],
        }),
      ],
    },
    external: getExternals(pkg),
    plugins: [
      vue(),
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        extensions: ['.js', '.vue'],
      }),
      resolve(),
      commonjs(),
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
      vue(),
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
        extensions: ['.js', '.vue'],
      }),
      resolve(),
      commonjs(),
      license(getBanner(pkg)),
    ],
  },
];
