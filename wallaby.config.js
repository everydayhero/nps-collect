module.exports = wallaby => ({
  files: [
    'source/**/*.js',
    '!source/**/__tests__/*.js'
  ],

  tests: [
    'source/**/__tests__/*.js'
  ],

  testFramework: 'mocha',

  compilers: {
    '**/*.js': wallaby.compilers.babel()
  },

  env: {
    type: 'node',
    runner: 'node'
  },

  bootstrap: () => {
    const jsdom = require('jsdom')

    const dom = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>')

    global.document = dom
    global.window = dom.defaultView

    propagateToGlobal(global.window)

    function propagateToGlobal (window) {
      for (let key in window) {
        if (!window.hasOwnProperty(key)) { continue }
        if (key in global) { continue }

        global[key] = window[key]
      }
    }

    require('babel-polyfill')
  }
})
