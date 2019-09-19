/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const CoreJSUpgradeWebpackPlugin = require("corejs-upgrade-webpack-plugin")

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ actions }) => {
  // add this to your webpack.plugins config
  actions.setWebpackConfig({
    resolve: {
      plugins: [new CoreJSUpgradeWebpackPlugin.default()],
    },
  })
}
