import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import { getBanner, getExternals } from '../../rollup.config';
import pkg from './package.json';

const builds = [
  // ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: getExternals(pkg),
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
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

if (process.env.BUILD !== 'development') {
  // UMD build
  builds.push({
    input: 'src/index.js',
    external: getExternals(pkg),
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'esm',
      globals: {
        'can-use-dom': 'canUseDOM',
      },
      plugins: [
        getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]],
        }),
      ],
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
  });

  // browser script tag build, minified
  builds.push({
    input: 'src/index.js',
    output: {
      name: 'SimpleBar',
      file: 'dist/simplebar.min.js',
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'umd' }]],
        }),
      ],
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
  });

  builds.push(
    // browser script tag build, non-minified
    {
      input: 'src/index.js',
      output: {
        name: 'SimpleBar',
        file: 'dist/simplebar.js',
        format: 'esm',
        plugins: [
          getBabelOutputPlugin({
            presets: [['@babel/preset-env', { modules: 'umd' }]],
          }),
        ],
      },
      plugins: [
        babel({
          // exclude: ['/**/node_modules/**'],
          babelHelpers: 'runtime',
          plugins: ['@babel/plugin-transform-runtime'],
        }),
        resolve(), // so Rollup can find dependencies
        commonjs(), // so Rollup can convert dependencies to an ES module
        license(getBanner(pkg)),
      ],
    }
  );
}

export default builds;
