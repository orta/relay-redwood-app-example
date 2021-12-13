const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  schema: getPaths().generated.schema,
}

// const path = require('path')
// const { config, directivesFile, includesGlobPattern } = require('vscode-apollo-relay').generateConfig()

// module.exports = {
//   client: {
//     ...config.client,
//     service: {
//       ...config.client.service,
//       localSchemaFile: '.redwood/schema.graphql',
//     },
//     // schema: getPaths().generated.schema,
//     includes: [directivesFile, path.join('./web/src', includesGlobPattern(['ts', 'tsx']))],
//   },
// }
