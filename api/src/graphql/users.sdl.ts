export const schema = gql`
  scalar ID

  # An object with a Globally Unique ID
  interface Node {
    id: ID!
  }

  type User implements Node {
    id: ID!
    name: String
    email: String!
    profileViews: Int!
    city: String!
    country: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: ID!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    profileViews: Int!
    city: String!
    country: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    profileViews: Int
    city: String
    country: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: ID!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: ID!): User! @requireAuth
  }
`
