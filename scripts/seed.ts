import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const data: Prisma.UserCreateArgs['data'][] = [
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      { name: 'alice', email: 'alice@example.com', city: 'one', country: '1' },
      { name: 'bob', email: 'bob@example.com', city: 'two', country: '2' },
      { name: 'charlie', email: 'charlie@example.com', city: 'three', country: '3' },
      { name: 'danielle', email: 'dani@example.com', city: 'four', country: '4' },
      { name: 'eli', email: 'eli@example.com', city: 'five', country: '5' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    ]
    console.log("\nUsing the default './scripts/seed.js' template\nEdit the file to add seed data\n")

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      data.map(async (userExample: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({
          data: userExample,
        })
        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
