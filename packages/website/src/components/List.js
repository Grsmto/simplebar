/** @jsx jsx */
import { jsx } from "theme-ui"

const List = ({ children, ...otherProps }) => (
  <ul
    {...otherProps}
    sx={{
      listStyle: "none",
    }}
  >
    {children}
  </ul>
)

export default List
