const { spawn } = require('child_process')

let relayCompiler = undefined
process.on('exit', (code) => {
  relayCompiler.kill(code)
})

/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    relayCompiler = spawn('yarn', ['relay-compiler', '--watch'], { shell: true })

    relayCompiler.stdout.on('data', (data) => {
      console.log(`Relay: ${data}`.trim())
    })

    relayCompiler.stderr.on('data', (data) => {
      console.log(`Relay ERR: ${data}`.trim())
    })
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
