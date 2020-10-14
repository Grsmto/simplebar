/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  return new Promise((resolve, reject) => {
    // Polyfill.io stuff
    window.__polyfillio__ = () => {
      resolve()
    }

    const features = []

    if (!("fetch" in window)) {
      features.push("fetch")
    }

    if (features.length) {
      const s = document.createElement("script")
      s.src = `https://cdn.polyfill.io/v3/polyfill.min.js?features=${features.join(
        ","
      )}&callback=__polyfillio__`
      s.async = true
      s.onerror = reject
      document.head.appendChild(s)
    } else {
      resolve()
    }
  })
}
