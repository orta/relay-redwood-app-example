import { Link, routes } from '@redwoodjs/router'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { UsersPageQuery } from 'src/components/__generated__/UsersPageQuery.graphql'

const UsersQuery = graphql`
  query UsersPageQuery {
    users(first: 5) @connection(key: "UsersPage_users") {
      edges {
        node {
          id
          name
          # This is intentionally left in for
          # the linter to show something
          email
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`

function UsersPage() {
  const data = useLazyLoadQuery<UsersPageQuery>(UsersQuery, {})
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

export default UsersPage
