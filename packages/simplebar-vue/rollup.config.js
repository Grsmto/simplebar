import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import uglify from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue';
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

const external = [...Object.keys(pkg.dependencies), 'vue'];

export default [
  {
    input: 'index.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd'
    },
    external: external,
    plugins: [
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      uglify(),
      license(banner),
      vue()
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
      vue(),
      license(banner)
    ]
  }
];
