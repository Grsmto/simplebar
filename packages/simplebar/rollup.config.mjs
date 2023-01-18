import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import { getBanner, getExternals } from '../../rollup.config.mjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const builds = [
  // ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    external: getExternals(pkg),
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({ tsconfig: '../../tsconfig.json' }),
      license(getBanner(pkg)),
    ],
  },
];

if (process.env.BUILD !== 'development') {
  // UMD build
  builds.push({
    input: 'src/index.ts',
    external: getExternals(pkg),
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd',
      exports: 'named',
      globals: {
        'can-use-dom': 'canUseDOM',
        'simplebar-core': 'SimpleBar',
      },
    },
    plugins: [
      typescript({ tsconfig: '../../tsconfig.json' }),
      license(getBanner(pkg)),
    ],
  });

  // browser script tag build, minified
  builds.push({
    input: 'src/index.ts',
    output: {
      name: 'SimpleBar',
      file: pkg.unpkg,
      format: 'iife',
      globals: {
        'can-use-dom': 'canUseDOM',
      },
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: '../../tsconfig.json' }),
      terser(),
      license(getBanner(pkg)),
    ],
  });

  builds.push(
    // browser script tag build, non-minified
    {
      input: 'src/index.ts',
      output: {
        name: 'SimpleBar',
        file: 'dist/simplebar.js',
        format: 'iife',
        globals: {
          'can-use-dom': 'canUseDOM',
        },
      },
      plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: '../../tsconfig.json' }),
        license(getBanner(pkg)),
      ],
    }
  );
}

export default builds;
