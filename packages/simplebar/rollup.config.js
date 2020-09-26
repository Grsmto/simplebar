import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const licence = {
  banner: `
        ${pkg.title || pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}

        Made by ${pkg.author}
        Under ${pkg.license} License
      `,
};

const externals = (id) => {
  if (
    Object.keys(pkg.dependencies).find(
      (dep) => id === dep && id !== 'simplebar-core'
    ) ||
    id.match(/(core-js).+/)
  ) {
    return true;
  }

  return false;
};

const builds = [
  // ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: externals,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      license(licence),
    ],
  },
];

if (process.env.BUILD !== 'development') {
  // UMD build
  builds.push({
    input: 'src/index.js',
    external: externals,
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
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      license(licence),
    ],
  });

  // browser script tag build, minified
  builds.push({
    input: 'src/index.js',
    output: {
      name: 'SimpleBar',
      file: 'dist/simplebar.min.js',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      terser(),
      license(licence),
    ],
  });

  builds.push(
    // browser script tag build, non-minified
    {
      input: 'src/index.js',
      output: {
        name: 'SimpleBar',
        file: 'dist/simplebar.js',
        format: 'umd',
      },
      plugins: [
        resolve(), // so Rollup can find dependencies
        commonjs(), // so Rollup can convert dependencies to an ES module
        babel({
          exclude: ['/**/node_modules/**'],
          babelHelpers: 'runtime',
          plugins: ['@babel/plugin-transform-runtime'],
        }),
        license(licence),
      ],
    }
  );
}

export default builds;
