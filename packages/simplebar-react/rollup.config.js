import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = {
  banner: `
        ${pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}

        Made by ${pkg.author}
        Under ${pkg.license} License
      `,
};
const globals = {
  'prop-types': 'PropTypes',
  react: 'React',
  'simplebar-core': 'SimpleBar',
};
const getExternals = (id) => {
  if (
    Object.keys(pkg.dependencies).find((dep) => id === dep) ||
    Object.keys(pkg.peerDependencies).find((dep) => id === dep) ||
    id.match(/(core-js).+/) ||
    id.match(/(@babel).+/)
  ) {
    return true;
  }

  return false;
};

export default [
  {
    input: 'index.js',
    external: getExternals,
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd',
      globals: globals,
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
      license(banner),
    ],
  },
  {
    input: 'index.js',
    external: getExternals,
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      license(banner),
    ],
  },
];
