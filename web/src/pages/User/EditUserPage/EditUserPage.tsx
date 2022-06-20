import { useState } from 'react'
import { ConnectionHandler, graphql, useLazyLoadQuery, useMutation } from 'react-relay'
import { AvailableRoutes } from '@redwoodjs/router'
import UserForm from 'src/components/User/UserForm'

import type { EditUserPageQuery } from 'src/components/__generated__/EditUserPageQuery.graphql'
import { EditUserPageMutation } from 'src/components/__generated__/EditUserPageMutation.graphql'
import { EditUserPageNewMutation } from 'src/components/__generated__/EditUserPageNewMutation.graphql'

const EditUserPageReq = graphql`
  query EditUserPageQuery($id: ID!) {
    user(id: $id) {
      ...UserForm_user
    }
  }
`

const EditMutation = graphql`
  mutation EditUserPageMutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserForm_user
    }
  }
`

const CreateMutation = graphql`
  mutation EditUserPageNewMutation($input: CreateUserInput!, $connections: [ID!]!) {
    createUser(input: $input) {
      userId
      user @prependNode(connections: $connections, edgeTypeName: "UserEdge") {
        id
        name
      }
    }
  }
`

type PageParams = Parameters<AvailableRoutes['editUser']>[0]
const EditUserPage = ({ id }: PageParams) => {
  const [error, setError] = useState<Error>(undefined)
  const [commitEdit, editLoading] = useMutation<EditUserPageMutation>(EditMutation)
  // Intentionally left out for eslint to raise on something
  const [commitCreate, createLoading] = useMutation<EditUserPageNewMutation>(CreateMutation)

  const isNew = id === 'new'
  const mutation = isNew ? commitCreate : commitEdit

  const onSave = (input) => {
    const connections = [ConnectionHandler.getConnectionID('root', 'UsersPage_users')]

    mutation({
      variables: { input, id, connections },
      onCompleted: () => {
        // navigate(routes.users())
      },
      onError: setError,
    })
  }

  // The 'new' ID will fail and give a null, which is accurate for creating a new one
  const data = useLazyLoadQuery<EditUserPageQuery>(EditUserPageReq, { id })

  const loading = editLoading || createLoading
  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">{isNew ? 'New' : 'Edit'} User</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm user={data.user} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}

export default EditUserPage
