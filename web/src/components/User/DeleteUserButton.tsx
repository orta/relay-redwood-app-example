import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'
import { graphql, useMutation } from 'react-relay'
import type { DeleteUserButtonMutation } from 'src/components/__generated__/DeleteUserButtonMutation.graphql'

export function DeleteUserButton(props: { id: string }) {
  const [commit, isInFlight] = useMutation<DeleteUserButtonMutation>(graphql`
    mutation DeleteUserButtonMutation($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `)

  const onclick = () => {
    if (confirm('Are you sure you want to delete user ' + props.id + '?')) {
      commit({
        variables: props,
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
