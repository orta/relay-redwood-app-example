import UserForm from 'src/components/User/UserForm'
import type { NewUserPageMutation, CreateUserInput } from 'src/components/__generated__/NewUserPageMutation.graphql'

import { Environment, useRelayEnvironment } from 'react-relay'

import { commitMutation, graphql } from 'react-relay'
import { useState } from 'react'
import { routes } from '@redwoodjs/router'

const NewUser = () => {
  const [error, setError] = useState<Error>(undefined)

  const env = useRelayEnvironment()
  const onSave = (input) => {
    commitNewUserMutation(env, input)
  }
  // TODO
  const loading = false

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New User</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )

  function commitNewUserMutation(environment: Environment, input: CreateUserInput) {
    return commitMutation<NewUserPageMutation>(environment, {
      mutation: graphql`
        mutation NewUserPageMutation($input: CreateUserInput!) {
          createUser(input: $input) {
            id
          }
        }
      `,
      variables: { input },
      onCompleted: (response) => {
        document.location = routes.user({ id: response.createUser.id })
      },
      onError: setError,
    })
  }
}

export default NewUser
