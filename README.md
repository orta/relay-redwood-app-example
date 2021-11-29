# Redwood with Relay

Relay is a great GraphQL API client for building scalable GraphQL driven projects. The mindshare for GraphQL clients is a bit like type-systems in JS a few years ago, the vast majority of people use JavaScript (Apollo) and think that the freedom and flexibility is great (Apollo is a good client and has a really low barrier to entry like JS). However, if you work with a solid type system in JS, you're _very_ unlikely to go back.

Relay is TypeScript to Apollo's JavaScript, featuring an incredibly tight feedback cycle and the removal of an entire suite of developer and user concerns in exchange for some restraints on how you build.

There's further Redwood-centered discussion in [their Show & Tell section](https://community.redwoodjs.com/t/example-app-of-redwood-with-relay/2568).

## Redwood and Relay Versions

This example works with:

- Relay 12, which is the last one using the JavaScript compiler, I will update this repo to the Relay Rust compiler when Relay 13 comes out.
- Redwood 0.38, which still has babel files, I need to see how to make [the babel plugin work in 0.39](https://community.redwoodjs.com/t/v0-39-release-candidate-is-available-feedback-wanted/2552#release-notes-breaking-changes-and-code-modifications-3)


## Setting up the client

The majority of the Relay setup lives in your web package, with just the babel change living in the root workspace.

Add the client deps:

- `yarn workspace web add react-relay`
- `yarn workspace web  --dev relay-config`

Create `web/relay.config.js`:

```js
module.exports = {
  src: './web',
  schema: '.redwood/schema.graphql',
  extensions: ['tsx'],
  language: 'typescript',
  artifactDirectory: './web/src/__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
}
```

Hook up the babel plugin to the root workspace:

```sh
yarn add --dev babel-plugin-relay "graphql@^15.0.0" -W
```

Then edit the babel config `babel.config.js` so that the relay plugin is ins:

```diff
/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ['@redwoodjs/core/config/babel-preset'],
+  plugins: ['relay'],
}
```

Set up the compiler:

```sh
yarn workspace web add --dev relay-compiler
```

Add the TS Relay plugin:

```
yarn workspace web add --dev relay-compiler-language-typescript
```

And add the script to the root workspace: `/package.json`:

```sh
{
   "relay": "yarn workspace web run relay-compiler"
}
```

## Replacing Apollo with Relay

We need to replace the Apollo provider in `web/App.tsx`:

```diff
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
+ import { RedwoodRelayProvider } from './relay/RedwoodRelayProvider'
- import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
+      <RedwoodRelayProvider>
-      <RedwoodApolloProvider>
        <Routes />
+      </RedwoodRelayProvider>
-      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
```

I have [the provider](./web/src/relay/RedwoodRelayProvider.tsx) in this repo, it's likely that in the future this will be abstracted into a library. It currently has a 'default setup' mode, but if you know what you're doing with Relay - you can pass your own Environment.

## Setting up a data model

I then edited the schema.prisma to [whatever it is now](./api/db/schema.prisma), and scaffolded the user with `yarn rw g scaffold user`.

## Cell No More

Redwood allows you to be able to overwrite the Redwood provided `useQuery` and `useMutation`, but I've not quite figured out how to get the types in match. These Redwood functions expect an unprocessed graphql query/mutation, but Relay relies on ahead-of-time work which means we can't use the global `gql` tag.

That said, it's likely if you're using Relay, you won't want to use the [Cell](https://redwoodjs.com/docs/cells) abstraction as they don't handle merging API grabbing into a single request.

## TBD: Preloading Queries

I've not figured out about whether you can use the [pre-loading APIs](https://relay.dev/docs/api-reference/use-preloaded-query/), I'd need to understand the Redwood router a bit more first.

So, we'll go with [`useLazyLoadQuery`](https://relay.dev/docs/api-reference/use-lazy-load-query/) which requires the component to be in the render tree before making API requests. This is the same behavior as an apollo version of Redwood, so it's not a biggie right now.

## A Component

I've only built out one component so far, which grabs some users from your API:

```tsx
import { Link, routes } from '@redwoodjs/router'
import { Suspense } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { UsersPageQuery } from 'src/components/__generated__/UsersPageQuery.graphql'

const UsersQuery = graphql`
  query UsersPageQuery {
    users {
      id
      name
      email
    }
  }
`

function UsersPage() {
  const data = useLazyLoadQuery<UsersPageQuery>(UsersQuery, {})

  return (
    <div>
      {(data.users || []).map((user) => (
        <Link key={user.id} to={routes.user({ id: user.id })}>
          {user.name}
        </Link>
      ))}

      <div className="rw-text-center">
        No users yet.
        <Link to={routes.newUser()} className="rw-link">
          Create one?
        </Link>
      </div>
    </div>
  )

}

function Loading() {
  return <div>Loading</div>
}

export default () => (
  <Suspense fallback={<Loading />}>
    <UsersPage />
  </Suspense>
)
```

## Run Relay

You've got a component, so you need to run

```sh
yarn relay
```

To generate files inside: `web/src/components/__generated__`

```
> tree c
web/src/components/__generated__
├── MyPagePageQuery.graphql.ts
├── UserPageQuery.graphql.ts
└── UsersPageQuery.graphql.ts

0 directories, 3 files
```

(I have some stubbed stuff in here)


### Run the Compiler in Watch Mode with your App

Run `yarn rw setup webpack` to  get a webpack config, we're not actually going to use it to do any config stuff, but to open the Relay Compiler in watch mode whenever our dev server is running:

```diff
const { spawn } = require('child_process')

+ let relayCompiler = undefined
+ process.on('exit', (code) => {
+   relayCompiler.kill(code)
+ })

/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
+    relayCompiler = spawn('yarn', ['relay-compiler', '--watch'], { shell: true })
+
+    relayCompiler.stdout.on('data', (data) => {
+      console.log(`Relay: ${data}`.trim())
+    })
+
+    relayCompiler.stderr.on('data', (data) => {
+      console.log(`Relay ERR: ${data}`.trim())
+    })
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
```

### Making the GraphQL API Relay Compliant

Relay makes two requests for your API:

1. You have a global UUID system of [Object Identification](https://relay.dev/docs/guides/graphql-server-specification/#object-identification), and all models have `id: ID!`

In our app, we can add a new schema file: `api/src/graphql/identification.sdl.ts` with:

```ts
export const schema = gql`
  scalar ID

  # An object with a Globally Unique ID
  interface Node {
    id: ID!
  }
`
```

Effectively telling the GraphQL server that `ID` is a new scalar (we'll use `String` under the hood), then we make the user conform:

```diff
export const schema = gql`
+  type User implements Node {
-  type User {
+   id: ID!
-   id: String!
    name: String
    email: String!
    profileViews: Int!
    city: String!
    country: String!
  }

  type Query {
    users: [User!]! @requireAuth
+   user(id: ID!): User @requireAuth
-   user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    profileViews: Int!
    city: String!
    country: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    profileViews: Int
    city: String
    country: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
+   updateUser(id: ID!, input: UpdateUserInput!): User! @requireAuth
-   updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
+   deleteUser(id: ID!): User! @requireAuth
-   deleteUser(id: String!): User! @requireAuth
  }
`
```

That tells the SDL that we're using an opaque `ID` in our system. Prisma can generate these for you via:

```prisma
model User {
  id           String  @id @default(cuid())
  name         String?
  email        String  @unique
  profileViews Int     @default(0)
  city         String
  country      String
}
```

[`@default(cuid())`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#cuid) creates globally unique IDs for you, which is perfect.

2. Optional, but Relay makes life very easy if your API server follows the [GraphQL Connections Spec](https://relay.dev/assets/files/connections-932f4f2cdffd79724ac76373deb30dc8.htm). I have [orta/redwood-app-connections](https://github.com/orta/redwood-app-connections) for the explanation there. There is a connection in [`web/src/components/User/Users/Users.tsx`](web/src/components/User/Users/Users.tsx) though [handling pagination](https://relay.dev/docs/api-reference/use-pagination-fragment/) is a good TODO.

## Mutations

Mutations require no special casing in comparison to the Relay Docs, here are some examples:

- [Delete User Button](./web/src/components/User/DeleteUserButton.tsx) - inline mutation hook
- [Create User](./web/src/pages/User/NewUserPage/NewUserPage.tsx) - imperitive mutation function which can be called in other places if needed
- [Edit User](./web/src/pages/User/EditUserPage/EditUserPage.tsx) - imperitive mutation function + query (probably a bit too much going on in this component though)

## Fragments

One of Relay's greatest abilities is [data-masking](https://youtu.be/1Z3loALSVQM?t=1152) (e.g. Relay passes data down your tree, not you) this is done via [GraphQL fragments](https://graphql.org/learn/queries/#fragments).

You can see this in action in the `UserForm`, which has:

```ts
import { UserForm_user$key } from 'src/components/__generated__/UserForm_user.graphql'

const UserForm = (props: { user?: UserForm_user$key; ... }) => {

const data = useFragment(
    graphql`
      fragment UserForm_user on User {
        id
        name
        email
        profileViews
        city
        country
      }
    `,
    props.user
  )
  // ...
}
```

This form is used in two places:

- NewUserPage, which _does not_ have a query (there's nothing to grab for a new user account)
- EditUserPage, which does have a query, which looks like:

  ```ts
  const EditUserPageReq = graphql`
    query EditUserPageQuery($id: ID!) {
      user(id: $id) {
        ...UserForm_user
      }
    }
  `
  ```

  Then later uses `<UserForm user={data.user} onSave={onSave} loading={loading} error={error} />`.


## Long Term Maintenance

Now that this repo is mostly complete and there is a full CRUD implementation of a User model in it. I have a sense of how much work would be necessary to do up-keep, and I think I'm willing to commit the time to converting my real app to use Relay and to live a little bit outside the Redwood Omakase.

## TODO

- [x] Run relay-compiler on `yarn rw dev`
- [x] Do the whole CRUD dance
- [x] Use fragments somewhere
- [] Preload queries by facading a Link and `routes`?
