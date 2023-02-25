// import type { StorybookConfig } from '@storybook/react-webpack5';

const config = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-essentials'],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgenTypescriptOptions: {
      propFilter: (prop: any) => ['label', 'disabled'].includes(prop.name),
    },
  },
  core: {
    builder: { name: 'webpack5' },
    channelOptions: { allowFunction: false, maxDepth: 10 },
    disableTelemetry: true,
  },
  framework: '@storybook/react',
  features: {
    storyStoreV7: !global.navigator?.userAgent?.match?.('jsdom'),
    buildStoriesJson: true,
    // previewMdx2: true,
    breakingChangesV7: true,
    babelModeV7: true,
  },
};
module.exports = config;
