require('babel-polyfill')
require('./dom')

function noop () {
  return {}
}

// prevent mocha tests from breaking when trying to require non-js files
require.extensions['.sass'] = noop
require.extensions['.scss'] = noop
require.extensions['.css'] = noop
require.extensions['.svg'] = noop
require.extensions['.jpg'] = noop
require.extensions['.jpeg'] = noop
require.extensions['.gif'] = noop
require.extensions['.png'] = noop
