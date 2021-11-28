# Redwood with Relay

Relay is a great GraphlQL API client for building scalable GraphQL driven projects.

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

## Next

I'd like to get all the CRUD on the user model working before this is called "finished".
