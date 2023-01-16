/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useEffect, useState } from "react"
import { graphql, withPrefix } from "gatsby"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { FiGithub } from "react-icons/fi"
import { MdStar } from "react-icons/md"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import List from "../components/List"

import LogoUrl from "../images/logo.svg"
import TwitchUrl from "../images/users/twitch.svg"
import StorybookUrl from "../images/users/storybook.svg"
import ZulipUrl from "../images/users/zulip.svg"

const verticalCenter = {
  display: "inline-flex",
  alignItems: "center",
}

function useGitHubStars() {
  const [stars, setStars] = useState(null)
  useEffect(() => {
    fetch("https://api.github.com/repos/grsmto/simplebar")
      .then((result) => result.json())
      .then((response) => setStars(response.stargazers_count))
  }, [])
  return stars
}

const IndexPage = ({ data }) => {
  const {
    markdownRemark: { html },
  } = data
  const stars = useGitHubStars()

  return (
    <Layout>
      <SEO title="Home" />
      <div sx={{ flexShrink: 0 }}>
        <div sx={{ height: 0, paddingBottom: "20%" }}>
          <img
            sx={{ flex: "0 0 auto" }}
            src={withPrefix(LogoUrl)}
            width={560}
            height={110}
            alt="SimpleBar logo"
          />
        </div>
      </div>
      <h1
        sx={{
          fontSize: 24,
          mt: 4,
          mb: 0,
          maxWidth: "540px",
          textAlign: "center",
        }}
      >
        Custom scrollbars made simple, lightweight, easy to use and
        cross-browser.
      </h1>
      <div sx={{ ...verticalCenter, mt: 3 }}>
        <a
          href="https://github.com/Grsmto/simplebar"
          sx={{
            ...verticalCenter,
            mr: 4,
          }}
        >
          <FiGithub sx={{ mr: 2 }} />
          View Simplebar on Github
        </a>
        <a
          href="https://github.com/grsmto/simplebar/stargazers"
          sx={{ ...verticalCenter, minWidth: "4em" }}
        >
          <MdStar sx={{ mr: 1, mt: "-1px", fontSize: "1.2em" }} />
          {stars}
        </a>
      </div>

      <SimpleBar
        sx={{
          flexGrow: 1,
          background: "#F5F5F5",
          width: "100%",
          height: "100%",
          mt: 4,
          overflow: "auto",
          p: [3, 5],
          ".simplebar-content": {
            p: [3, 5],
          },
        }}
        autoHide={false}
        scrollbarMinSize={30}
      >
        <Styled.root dangerouslySetInnerHTML={{ __html: html }} />
      </SimpleBar>

      <h3 sx={{ mt: 4 }}>Who is using it?</h3>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: [4, 5],
          "li + li": {
            ml: [4, 5],
          },
        }}
      >
        <li>
          <img src={TwitchUrl} alt="Twitch" />
        </li>
        <li>
          <img src={StorybookUrl} alt="Storybook" />
        </li>
        <li>
          <img src={ZulipUrl} alt="Zulip" />
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
