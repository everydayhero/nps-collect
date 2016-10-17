const { DefinePlugin } = require('webpack')

module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || ''}'`,
      'process.env.JEFFREY_TOKEN': `'${process.env.JEFFREY_TOKEN || ''}'`
    })
  ]
}
