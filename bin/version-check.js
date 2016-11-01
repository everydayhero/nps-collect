#!/usr/bin/env node

var wget = require('wget')
var spinner = require('simple-spinner')
var pkg = require('../package')

var options = {
  protocol: 'https',
  host: 'shared-scripts.s3.amazonaws.com',
  path: '/nps-collect-' + pkg.version + '.js',
  method: 'GET'
}

var start = () => {
  console.log('checking for version ' + pkg.version + ' ....')
  spinner.start()
}

var fail = err => {
  spinner.stop()
  console.log('Error - Unable to check version:', err)

  process.exit(1)
}

var versionNotFound = () => {
  spinner.stop()
  console.log('OK to publish')

  process.exit(0)
}

var versionExists = () => {
  spinner.stop()
  console.log('Error: Version ' + pkg.version +
    ' already exists - please increment version number')

  process.exit(1)
}

start()

var req = wget.request(options, res => {
  if (res.statusCode === 200) {
    res.on('error', (err) => {
      fail(err)
    })

    res.on('data', () => {
      versionExists()
      req.end()
    })

    res.on('end', () => {
      versionExists()
    })
  } else if (res.statusCode === 403) {
    versionNotFound()
  } else {
    fail(res.statusCode)
  }
})

req.end()
req.on('error', () => {
  fail('Network error')
})
