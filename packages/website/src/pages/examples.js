/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Demo from "../../../examples/Demo"

import "../demo.css"

const ExamplePage = () => {
  return (
    <Layout>
      <SEO title="Examples" />
      <div
        sx={{
          mb: 5,
          width: "100%",
        }}
      >
        <h1
          sx={{
            mb: 5,
          }}
        >
          Simplebar examples
        </h1>
        <Demo />
      </div>
    </Layout>
  )
}

export default ExamplePage
