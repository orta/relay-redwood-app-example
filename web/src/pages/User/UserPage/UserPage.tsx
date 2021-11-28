import { graphql, useLazyLoadQuery } from 'react-relay'
import { Suspense } from 'react'

import { AvailableRoutes, Link, routes } from '@redwoodjs/router'
import { UserPageQuery } from 'src/components/__generated__/UserPageQuery.graphql'
import { DeleteUserButton } from 'src/components/User/DeleteUserButton'

type PageParams = Parameters<AvailableRoutes['user']>[0]

const UserQuery = graphql`
  query UserPageQuery($id: ID!) {
    user(id: $id) {
      id
      name
      email
      profileViews
      city
      country
    }
  }
`

function UserPage(props: PageParams) {
  const { user } = useLazyLoadQuery<UserPageQuery>(UserQuery, { id: props.id })

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">User {user.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Profile views</th>
              <td>{user.profileViews}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{user.city}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{user.country}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editUser({ id: user.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <DeleteUserButton id={user.id} />
      </nav>
    </>
  )
}

function Loading() {
  return <div>Loading</div>
}

export default (props: PageParams) => (
  <Suspense fallback={<Loading />}>
    <UserPage {...props} />
  </Suspense>
)
