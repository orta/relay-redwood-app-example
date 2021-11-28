# Redwood with Relay

Relay is a great GraphlQL API client for building scalable GraphQL driven projects.

### Setting up the client

Add the client deps:

- `yarn workspace web add react-relay`
- `yarn workspace web  --dev relay-config`

Create `relay.config.js`:

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

Hook up the babel plugin:

```sh
yarn add --dev babel-plugin-relay "graphql@^15.0.0" -W
```

Then edit the babel config `babel.config.js`:

```diff
/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ['@redwoodjs/core/config/babel-preset'],
+  plugins: ['relay'],
}
```

Set up the compiler:

```sh
yarn -W add --dev relay-compiler
```

Add the TS Relay plugin:

```
yarn -W add --dev relay-compiler-language-typescript
```

And add the script to the root workspace: `/package.json`:

```sh
{
  "relay": "relay-compiler"
}
```

### Setting up a data model

I then edited the schema.prisma to [whatever it is now](./api/db/schema.prisma).

### Prisma -> Relay ID



