import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = {
  banner: `
        ${pkg.title || pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}
        
        Made by ${pkg.author}
        Under ${pkg.license} License
      `
};

export default [
  // browser-friendly UMD build
  {
    input: 'src/simplebar.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**']
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      uglify(),
      license(banner)
    ]
  },
  // browser-friendly, non-minified UMD build
  {
    input: 'src/simplebar.js',
    output: {
      name: 'SimpleBar',
      file: 'dist/simplebar.js',
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**']
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      license(banner)
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/simplebar.js',
    external: Object.keys(pkg.dependencies),
    output: { 
      file: pkg.module, 
      format: 'es',
      sourcemap: true
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**']
      }),
      license(banner)
    ]
  }
];