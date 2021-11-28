module.exports = {
  src: './src',
  schema: '../.redwood/schema.graphql',
  extensions: ['tsx'],
  language: 'typescript',
  artifactDirectory: './src/components/__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
}
