module.exports = wallaby => ({
  files: [
    'test/*.js',
    { pattern: 'assets/*', load: false },
    'source/**/*.js',
    '!source/**/__tests__/*.js'
  ],

  tests: [
    'source/**/__tests__/*.js'
  ],

  testFramework: 'mocha',

  compilers: {
    '**/*.js': wallaby.compilers.babel({
      presets: ['latest', 'stage-0', 'react'],
      plugins: ['espower']
    })
  },

  env: {
    type: 'node',
    runner: 'node'
  },

  bootstrap: () => {
    require('./test/setup')
  }
})
