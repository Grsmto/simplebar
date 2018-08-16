import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = {
  banner: `
        ${pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}
        
        Made by ${pkg.author}
        Under ${pkg.license} License
      `
};
const globals = {
  'prop-types': 'PropTypes',
  'react': 'React'
};
const external = [...Object.keys(pkg.dependencies), 'react'];

export default [
  {
    input: 'index.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd',
      globals: globals
    },
    external: external,
    plugins: [
      babel(),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      uglify(),
      license(banner)
    ]
  },
  {
    input: 'index.js',
    external: external,
    output: {
      file: pkg.module, 
      format: 'es' 
    },
    plugins: [
      babel(),
      license(banner)
    ]
  }
];