import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { getExternals, babelConfig } from '../../rollup.config';
import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: getExternals(pkg),
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
    ],
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: getExternals(pkg),
    output: [
      {
        name: 'SimpleBar',
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
    plugins: [
      babel({
        ...babelConfig,
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      resolve(),
      commonjs(),
    ],
  },
];
