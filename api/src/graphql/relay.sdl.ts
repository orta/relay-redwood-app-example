// This file ensures that the GraphQL IDE integration knows about
// all of the directives, basically saving you from seeing a lot of squiggles

// https://github.com/facebook/relay/blob/a8b1e6fdb7d96776de769dafb2d477cf32aa7582/compiler/crates/relay-schema/src/relay-extensions.graphql
// MIT: https://github.com/facebook/relay/blob/main/LICENSE

export const schema = gql`
  # Copyright (c) Facebook, Inc. and its affiliates.
  #
  # This source code is licensed under the MIT license found in the
  # LICENSE file in the root directory of this source tree.

  directive @relay_test_operation on QUERY | MUTATION | SUBSCRIPTION

  """
  (Relay only)

  The hooks APIs that Relay exposes allow you to read data from the store only
  during the render phase. In order to read data from outside of the render
  phase (or from outside of React), Relay exposes the @inline directive. The
  data from a fragment annotated with @inline can be read using readInlineData.

  [Read More](https://relay.dev/docs/api-reference/graphql-and-directives/#inline)
  """
  directive @inline on FRAGMENT_DEFINITION

  directive @no_inline(raw_response_type: Boolean) on FRAGMENT_DEFINITION

  """
  (Relay only)

  A directive added to queries which tells Relay to generate types that cover
  the optimisticResponse parameter to commitMutation.

  [Read More](https://relay.dev/docs/glossary/#raw_response_type)
  """
  directive @raw_response_type on QUERY | MUTATION | SUBSCRIPTION

  directive @DEPRECATED__relay_ignore_unused_variables_error on QUERY | MUTATION | SUBSCRIPTION

  """
  (Relay Only)

  For use with [useRefetchableFragment](https://relay.dev/docs/api-reference/use-refetchable-fragment/).

  The @refetchable directive can only be added to fragments that are
  "refetchable", that is, on fragments that are declared on Viewer or Query
  types, or on a type that implements Node (i.e. a type that has an id).

  [Read More](https://relay.dev/docs/api-reference/use-refetchable-fragment/#arguments)
  """
  directive @refetchable(queryName: String!, directives: [String!]) on FRAGMENT_DEFINITION

  """
  (Relay Only)

  A directive that modifies queries and which causes Relay to generate
  $Parameters.js files and preloadable concrete requests. Required if the
  query is going to be used as part of an entry point.

  The hackPreloader argument is FB only and generates a Hack preloader file.

  [Read More](https://relay.dev/docs/glossary/#preloadable)
  """
  directive @preloadable(hackPreloader: Boolean = false) on QUERY

  """
  (Relay Only)

  A directive that allows you to turn off Relay's data masking.

  Read more
  [here](https://relay.dev/docs/api-reference/graphql-and-directives/#relayplural-boolean)
  and
  [here](https://relay.dev/docs/api-reference/graphql-and-directives/#relaymask-boolean).
  """
  directive @relay(mask: Boolean, plural: Boolean) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD

  # Handles
  # prettier-ignore
  directive @__clientField(
  filters: [String!]
  handle: String!
  key: String
) repeatable on FIELD

  # MatchTransform
  """
  (Relay Only)

  A directive that, when used in combination with @module, allows users to
  download specific JS components alongside the rest of the GraphQL payload if
  the field decorated with [@match](https://relay.dev/docs/glossary/#match)
  has a certain type. See [3D](https://relay.dev/docs/glossary/#3d).

  [Read More](https://relay.dev/docs/glossary/#match)
  """
  directive @match(key: String) on FIELD

  """
  (Relay Only)

  A directive that, when used in combination with
  [@match](https://relay.dev/docs/glossary/#match), allows users to specify
  which JS components to download if the field decorated with @match has a
  certain type. See [3D](https://relay.dev/docs/glossary/#3d).

  [Read More](https://relay.dev/docs/glossary/#module)
  """
  directive @module(name: String!) on FRAGMENT_SPREAD

  # ConnectionTransform
  """
  (Relay Only)

  A directive which declares that a field implements the connection spec.

  [Read More](https://relay.dev/docs/guided-tour/list-data/pagination/)
  """
  directive @connection(key: String!, filters: [String], handler: String, dynamicKey_UNSTABLE: String) on FIELD

  directive @stream_connection(
    key: String!
    filters: [String]
    handler: String
    label: String
    initial_count: Int!
    if: Boolean = true
    use_customized_batch: Boolean = false
    dynamicKey_UNSTABLE: String
  ) on FIELD

  # RequiredTransform
  enum RequiredFieldAction {
    NONE
    LOG
    THROW
  }

  """
  (Relay Only)

  @required is a directive you can add to fields in your Relay queries to
  declare how null values should be handled at runtime. You can think of it as
  saying "if this field is ever null, its parent field is invalid and should be
  null".

  [Read More](https://www.internalfb.com/intern/staticdocs/relay/docs/guides/required-directive/) (FB only)
  """
  directive @required(action: RequiredFieldAction!) on FIELD

  # DeclarativeConnection
  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this field
  will be removed from the store.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @deleteRecord on FIELD

  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this edge
  will be removed from its parent connection.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @deleteEdge(connections: [ID!]!) on FIELD

  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this edge
  will be appended to its parent connection.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @appendEdge(connections: [ID!]!) on FIELD

  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this edge
  will be prepended to its parent connection.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @prependEdge(connections: [ID!]!) on FIELD

  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this node
  will be appended to its parent connection.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @appendNode(connections: [ID!]!, edgeTypeName: String!) on FIELD

  """
  (Relay Only)

  For use within mutations. After the mutation request is complete, this node
  will be prepended to its parent connection.

  [Read More](https://relay.dev/docs/guided-tour/updating-data/graphql-mutations/#updating-data-once-a-request-is-complete)
  """
  directive @prependNode(connections: [ID!]!, edgeTypeName: String!) on FIELD

  # RelayClientComponentTransform
  directive @relay_client_component on FRAGMENT_SPREAD

  # RelayResolver
  directive @relay_resolver(fragment_name: String!, import_path: String!) on FIELD_DEFINITION

  """
  (Relay Only)

  Marks a given query or fragment as updatable.

  [Read More](https://fb.quip.com/4FZaADvkQPPl)
  """
  directive @updatable on QUERY | FRAGMENT_DEFINITION

  """
  (Relay Only)

  Marks a given fragment as assignable.

  [Read More](https://fb.quip.com/4FZaADvkQPPl)
  """
  directive @assignable on FRAGMENT_DEFINITION
`
