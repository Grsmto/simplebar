import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
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

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: pkg.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      license(licence),
    ],
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    output: [
      {
        name: 'SimpleBar',
        file: pkg.main,
        format: 'umd',
        sourcemap: true,
        globals: {
          'lodash-es': '_',
        },
      },
    ],
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      license(licence),
    ],
  },
];
