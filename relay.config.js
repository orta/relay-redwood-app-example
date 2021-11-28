module.exports = {
  src: './web',
  schema: '.redwood/schema.graphql',
  extensions: ['tsx'],
  language: 'typescript',
  artifactDirectory: './web/src/__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
}
