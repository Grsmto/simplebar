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
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: (id) => {
      if (
        Object.keys(pkg.dependencies).find((dep) => id === dep) ||
        id.match(/(core-js).+/)
      ) {
        return true;
      }

      return false;
    },
    output: {
      file: pkg.main,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**'],
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      license(licence),
    ],
  },
];
