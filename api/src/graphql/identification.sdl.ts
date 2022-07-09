export const schema = gql`
  scalar ID

  # An object with a Globally Unique ID
  interface Node {
    id: ID!
  }

  type Query {
    node(id: ID): Node! @skipAuth
  }

  type Mutation {
    deleteNode(id: ID): Node! @requireAuth
  }
`
