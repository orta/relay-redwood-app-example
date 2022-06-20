import type { Prisma } from '@prisma/client'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { db } from 'src/lib/db'
import { CreateUserPayload, MutationcreateUserArgs, QueryusersArgs } from '../../../types/graphql'

export const users = (args: QueryusersArgs) => {
  // if (!args.first && !args.last) throw new Error('Need first or last arg')

  return findManyCursorConnection(
    (args) => {
      console.log({ args })
      return db.user.findMany(args)
    },
    () => db.user.count(),
    args
  )
}

export const user = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input }: MutationcreateUserArgs): Promise<CreateUserPayload> => {
  const user = await db.user.create({
    data: input,
  })

  return {
    user,
    userId: user.id,
  }
}

interface UpdateUserArgs extends Prisma.UserWhereUniqueInput {
  input: Prisma.UserUpdateInput
}

export const updateUser = ({ id, input }: UpdateUserArgs) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.delete({
    where: { id },
  })
}
