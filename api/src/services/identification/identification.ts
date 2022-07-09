import { deleteUser, user } from '../users/users'

const noop = () => {
  throw new Error('This resolver does not exist:')
}

// Whenever we create a User object, the id is a generated UUID
// and then we append :user to the end of the id. This is then
// understood by the node resolver to go to the 'get' for a user.

const nodeTypes = {
  ':user': {
    type: 'User',
    get: user,
    delete: deleteUser,
  },

  // This would be a longer list of all the types in your codebase
  // which conform to the Node interface.
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
