import { Link, routes } from '@redwoodjs/router'
import { Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { UsersPageQuery } from 'src/components/__generated__/UsersPageQuery.graphql'

const UsersQuery = graphql`
  query UsersPageQuery {
    users(first: 5) {
      edges {
        node {
          id
          name
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

      <div className="rw-text-center">
        No users yet.
        <Link to={routes.newUser()} className="rw-link">
          Create one?
        </Link>
      </div>
    </div>
  )
}

function Loading() {
  return <div>Loading</div>
}

export default () => (
  <Suspense fallback={<Loading />}>
    <UsersPage />
  </Suspense>
)
