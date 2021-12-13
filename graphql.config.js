const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  schema: [getPaths().generated.schema, './web/config/relay.graphql'],
  documents: 'web/src/**/*.tsx',
}
