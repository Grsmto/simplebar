import React from "react"
import SimpleBarReact from "simplebar-react"

import "simplebar/src/simplebar.css"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <SimpleBarReact style={{ maxHeight: 300 }}>
      {[...Array(50)].map((x, i) => (
        <p>{i}</p>
      ))}
    </SimpleBarReact>
  </Layout>
)

export default IndexPage
