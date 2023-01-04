import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { getExternals, babelConfig } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

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
    plugins: [
      resolve({ extensions }),
      typescript({ tsconfig: '../../tsconfig.json', noForceEmit: true }),
      babel({
        ...babelConfig,
        include: ['src/**/*'],
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
    ],
  },
  // CommonJS (for Node)
  {
    input: 'src/index.ts',
    external: getExternals(pkg),
    output: [
      {
        name: 'SimpleBar',
        file: pkg.main,
        format: 'umd',
        sourcemap: true,
        exports: 'named',
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
      resolve({ extensions }),
      typescript({ tsconfig: '../../tsconfig.json', noForceEmit: true }),
      babel({
        ...babelConfig,
        include: ['src/**/*'],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs(),
    ],
  },
];
