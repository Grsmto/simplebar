/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import theme from "../theme"

import "modern-normalize/modern-normalize.css"
import "typeface-nunito"

const Layout = ({ children, ...otherProps }) => {
  const { browserstackImage } = useStaticQuery(query)

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
            color: theme.colors.primary,
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "button, a": {
            transition: "all 150ms",
          },
          img: {
            display: "block",
            maxWidth: "100%",
          },
          "h1, h2, h3": {
            fontWeight: theme.fontWeights.heading,
          },
          h3: {
            fontSize: theme.fontSizes[5],
          },
          ".simplebar-scrollbar:before": {
            backgroundImage:
              "linear-gradient(-131deg, #E7B02B 0%, #C13E51 100%)",
          },
          ".simplebar-track .simplebar-scrollbar.simplebar-visible::before": {
            opacity: 1,
          },
          ".simplebar-track.simplebar-vertical .simplebar-scrollbar::before": {
            top: 10,
            bottom: 10,
          },
          ".simplebar-track.simplebar-horizontal .simplebar-scrollbar::before": {
            left: 10,
            right: 10,
          },
          ".simplebar-track.simplebar-vertical": {
            width: "21px",
          },
          ".simplebar-vertical .simplebar-scrollbar": {
            marginRight: 2,
          },
          ".simplebar-horizontal": {
            height: "11px",
          },
        })}
      />
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: `0 auto`,
          maxWidth: 960,
          padding: [3, 4],
          height: "100vh",
        }}
        {...otherProps}
      >
        {children}
        <footer
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            alignItems: "center",
            mt: "auto",
            fontSize: [0, 2],
            width: "100%",
          }}
        >
          Released under the MIT License Copyright © {new Date().getFullYear()}{" "}
          Adrien Denat
          <span
            sx={{
              display: "inline-flex",
              alignItems: "center",
              ml: [0, "auto"],
            }}
          >
            Sponsored by{" "}
            <a
              href="https://www.browserstack.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 2 }}
            >
              <Img
                style={{ display: "block" }}
                fixed={browserstackImage.childImageSharp.fixed}
                width={120}
              />
            </a>
          </span>
        </footer>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const query = graphql`
  {
    browserstackImage: file(relativePath: { eq: "browserstack.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`
