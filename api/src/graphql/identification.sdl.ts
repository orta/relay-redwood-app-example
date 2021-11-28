export const schema = gql`
  scalar ID

  # An object with a Globally Unique ID
  interface Node {
    id: ID!
  }
`
