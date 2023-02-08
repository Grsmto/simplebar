export const getExternals = (pkg) => (id) => {
  if (
    Object.keys(pkg.dependencies).find((dep) => id === dep) ||
    Object.keys(pkg.peerDependencies || {}).find((dep) => id === dep) ||
    id.match(/(lodash).+/) ||
    id.match(/(lodash-es).+/) ||
    id.match(/(core-js).+/) ||
    id.match(/(@babel).+/)
  ) {
    return true;
  }

  return false;
};

export const getBanner = (pkg) => ({
  banner: `
        ${pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}

        Made by ${pkg.author}
        Under ${pkg.license} License
      `,
});

export const babelConfig = {
  extensions: ['.js', '.ts'],
  exclude: ['**/node_modules/**'],
  babelHelpers: 'runtime',
};

export const tsConfig = {
  tsconfig: '../../tsconfig.json',
  exclude: ['**/*.test.ts', '**/*.test.tsx', 'tests/*'],
};
