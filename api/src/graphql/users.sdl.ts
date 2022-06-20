export const schema = gql`
  type User implements Node {
    id: ID!
    name: String
    email: String!
    profileViews: Int!
    city: String!
    country: String!
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
  }

  type Query {
    users(first: Int, last: Int, before: String, after: String): UserConnection @skipAuth
    user(id: ID!): User @skipAuth
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

  interface ErrorInterface {
    message: String
  }

  type CreateUserPayload {
    userId: ID
    user: User
    # errors: [ErrorInterface!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload! @skipAuth
    updateUser(id: ID!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: ID!): User! @skipAuth
  }
`
