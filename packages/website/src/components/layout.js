/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"

import theme from "../theme"

import "modern-normalize/modern-normalize.css"
import "typeface-nunito"
console.log(theme)
const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={theme => ({
          html: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontSize: "62.5%",
          },
          body: {
            fontSize: theme.fontSizes.body,
            fontFamily: theme.fonts.body,
            fontWeight: theme.fontWeights.body,
            lineHeight: theme.lineHeights.body,
            color: theme.colors.body,
          },
          "b, strong": {
            fontWeight: 700,
          },
          a: {
            textDecoration: "none",
            textTransform: "uppercase",
            color: theme.colors.primary,
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "button, a": {
            transition: "all 150ms",
          },
          img: {
            maxWidth: "100%",
          },
          "h1, h2, h3": {
            fontWeight: theme.fontWeights.heading,
          },
          h3: {
            fontSize: theme.fontSizes[5],
          },
        })}
      />
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: `0 auto`,
          maxWidth: 960,
          padding: 4,
          minHeight: "100vh",
        }}
      >
        <main
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          {children}
        </main>
        <footer sx={{ mt: "auto" }}>
          Released under the MIT License Copyright © {new Date().getFullYear()}{" "}
          Adrien Denat Sponsored by <a href="https://www.gatsbyjs.org"></a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
