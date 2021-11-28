import UserForm from 'src/components/User/UserForm'
import type { EditUserPageMutation, UpdateUserInput } from 'src/components/__generated__/EditUserPageMutation.graphql'
import type { EditUserPageQuery } from 'src/components/__generated__/EditUserPageQuery.graphql'

import { Environment, useLazyLoadQuery, useRelayEnvironment } from 'react-relay'

import { commitMutation, graphql } from 'react-relay'
import { useState, Suspense } from 'react'
import { AvailableRoutes, routes } from '@redwoodjs/router'

type PageParams = Parameters<AvailableRoutes['editUser']>[0]
const EditUserPage = ({ id }: PageParams) => {
  const [error, setError] = useState<Error>(undefined)

  const env = useRelayEnvironment()
  const onSave = (input) => {
    commitEditMutation(env, id, input)
  }

  const EditUserPageReq = graphql`
    query EditUserPageQuery($id: ID!) {
      user(id: $id) {
        ...UserForm_user
      }
    }
  `

  const data = useLazyLoadQuery<EditUserPageQuery>(EditUserPageReq, { id })

  const loading = false

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit User</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm user={data.user} onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )

  function commitEditMutation(environment: Environment, id: string, input: UpdateUserInput) {
    return commitMutation<EditUserPageMutation>(environment, {
      mutation: graphql`
        mutation EditUserPageMutation($id: ID!, $input: UpdateUserInput!) {
          updateUser(id: $id, input: $input) {
            id
          }
        }
      `,
      variables: { id, input },
      onCompleted: (response) => {
        document.location = routes.users()
      },
      onError: setError,
    })
  }
}

function Loading() {
  return <div>Loading</div>
}

export default (props: PageParams) => (
  <Suspense fallback={<Loading />}>
    <EditUserPage {...props} />
  </Suspense>
)
