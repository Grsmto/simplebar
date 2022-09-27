/** @jsx jsx */
import { jsx } from "theme-ui"

const List = ({ children, ...otherProps }) => (
  <ul
    {...otherProps}
    sx={{
      listStyle: "none",
      p: 0,
    }}
  >
    {children}
  </ul>
)

export default List
