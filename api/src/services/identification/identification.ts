import { deleteUser, user } from '../users/users'

const noop = () => {
  throw new Error('This resolver does not exist:')
}

const nodeTypes = {
  ':user': {
    type: 'User',
    get: user,
    delete: deleteUser,
  },
}

const keys = Object.keys(nodeTypes)

export const node = (args: { id: string }) => {
  for (const key of keys) {
    if (args.id.endsWith(key)) {
      return nodeTypes[key].get({ id: args.id })
    }
  }

  throw new Error(`Did not find a resolver for node with ${args.id}`)
}

export const deleteNode = (args: { id: string }) => {
  for (const key of keys) {
    if (args.id.endsWith(key)) {
      return nodeTypes[key].delete({ id: args.id })
    }
  }
  throw new Error(`Did not find a resolver for deleteNode with ${args.id}`)
}
