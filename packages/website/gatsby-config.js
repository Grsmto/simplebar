module.exports = {
  pathPrefix: "/simplebar",
  siteMetadata: {
    title: `SimpleBar · Custom scrollbars made simple.`,
    description: `SimpleBar does only one thing: replace the browser's default scrollbar with a custom CSS-styled one without losing performances. For React, Vue, Angular or VanillaJS!`,
    author: `@adriendenat`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/README.md`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
