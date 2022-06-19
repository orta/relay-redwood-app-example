import { graphql, useLazyLoadQuery } from 'react-relay'
import type { UsersPageQuery } from 'src/components/__generated__/UsersPageQuery.graphql'
import UsersList from './UsersList'

function UsersPage() {
  const data = useLazyLoadQuery<UsersPageQuery>(
    graphql`
      query UsersPageQuery {
        ...UsersList_query
      }
    `,
    {}
  )

  return <UsersList query={data} />
}

export default UsersPage
