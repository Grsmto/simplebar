/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: 4,
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
