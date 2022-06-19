import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'
import { ConnectionHandler, graphql, useMutation } from 'react-relay'
import type { DeleteUserButtonMutation } from 'src/components/__generated__/DeleteUserButtonMutation.graphql'

export function DeleteUserButton(props: { id: string }) {
  const [commit, isInFlight] = useMutation<DeleteUserButtonMutation>(graphql`
    mutation DeleteUserButtonMutation($id: ID!, $connections: [ID!]!) {
      deleteUser(id: $id) {
        id @deleteEdge(connections: $connections)
      }
    }
  `)

  const onclick = () => {
    const connectionId = ConnectionHandler.getConnectionID(props.id, 'UsersPage_users')
    if (confirm('Are you sure you want to delete user ' + props.id + '?')) {
      commit({
        variables: {
          id: props.id,
          connections: [connectionId],
        },
        onCompleted() {
          toast.success('User deleted')
          navigate(routes.users())
        },
      })
    }
  }

  return (
    <button type="button" className="rw-button rw-button-red" onClick={onclick} disabled={isInFlight}>
      Delete
    </button>
  )
}
