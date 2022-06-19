import { Link, routes } from '@redwoodjs/router'
import { graphql, usePaginationFragment } from 'react-relay'
import { UsersListQuery } from 'src/components/__generated__/UsersListQuery.graphql'
import { UsersList_query$key } from 'src/components/__generated__/UsersList_query.graphql'

const UsersList = (props: { query: UsersList_query$key }) => {
  const { data } = usePaginationFragment<UsersListQuery, UsersList_query$key>(
    graphql`
      fragment UsersList_query on Query
      @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
      @refetchable(queryName: "UsersListQuery") {
        users(first: $first, after: $after) @connection(key: "UsersPage_users") {
          edges {
            node {
              id
              name
              # This is intentionally left in for
              # the linter to show something
            }
          }
          pageInfo {
            endCursor
          }
        }
      }
    `,
    props.query
  )

  const users = data.users.edges.map((n) => n.node)
  return (
    <div>
      {(users || []).map((user) => (
        <li key={user.id}>
          <Link to={routes.user({ id: user.id })}>{user.name}</Link>
        </li>
      ))}

      {!users.length && <NoUsers />}
    </div>
  )
}

const NoUsers = () => (
  <div className="rw-text-center">
    No users yet.
    <br />
    <Link to={routes.newUser()} className="rw-link">
      Create one?
    </Link>
  </div>
)

export default UsersList
