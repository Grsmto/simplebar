import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
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
  'simplebar-core': 'SimpleBar',
};
const external = (id) => {
  if (
    Object.keys(pkg.dependencies).find((dep) => id === dep) ||
    id.match(/(core-js).+/) ||
    id === 'vue'
  ) {
    return true;
  }

  return false;
};

export default [
  {
    input: 'index.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      vue(),
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        extensions: ['.js', '.vue'],
      }),
      terser(),
      license(banner),
    ],
  },
  {
    input: 'index.js',
    external: external,
    output: {
      file: pkg.module,
      format: 'esm',
      globals: globals,
    },
    plugins: [
      vue(),
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
        extensions: ['.js', '.vue'],
      }),
      license(banner),
    ],
  },
];
