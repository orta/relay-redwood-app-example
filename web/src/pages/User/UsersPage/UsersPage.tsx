import { Link, routes } from '@redwoodjs/router'
import { Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { UsersPageQuery } from 'src/components/__generated__/UsersPageQuery.graphql'

const UsersQuery = graphql`
  query UsersPageQuery {
    users {
      id
      name
      email
    }
  }
`

function UsersPage() {
  const data = useLazyLoadQuery<UsersPageQuery>(UsersQuery, {})

  return (
    <div>
      {(data.users || []).map((user) => (
        <Link key={user.id} to={routes.user({ id: user.id })}>
          {user.name}
        </Link>
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
