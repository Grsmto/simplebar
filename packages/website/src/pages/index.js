/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import SimpleBar from "simplebar-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import List from "../components/List"

import LogoUrl from "../images/logo.svg"
import TwitchUrl from "../images/users/twitch.svg"
import StorybookUrl from "../images/users/storybook.svg"
import ZulipUrl from "../images/users/zulip.svg"

const IndexPage = ({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark

  return (
    <Layout>
      <SEO title="Home" />
      <img src={LogoUrl} />
      <h2>
        Custom scrollbars made simple, lightweight, easy to use and
        cross-browser.
      </h2>
      <p>
        <a
          href="https://github.com/Grsmto/simplebar"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Simplebar on Github
        </a>
      </p>

      <SimpleBar sx={{ maxHeight: 300 }}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </SimpleBar>

      <h3>Who is using it?</h3>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <li>
          <img src={TwitchUrl} />
        </li>
        <li>
          <img src={StorybookUrl} />
        </li>
        <li>
          <img src={ZulipUrl} />
        </li>
      </List>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    markdownRemark {
      html
    }
  }
`
