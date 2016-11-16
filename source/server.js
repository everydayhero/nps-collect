import Helmet from 'react-helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './components/App'

const renderScripts = scripts => (
  scripts.map(script => `<script src=${script}></script>`).join('')
)

const renderStyles = styles => (
  styles.map(style => `<link rel="stylesheet" href=${style} />`).join('')
)

const renderDocument = ({ assets = [], content = '', head }) => {
  const styles = assets.filter((asset) => asset.match(/\.css$/))
  const scripts = assets.filter((asset) => asset.match(/\.js$/))

  return (`
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="UTF-8" />
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${renderStyles(styles)}
      </head>
      <body>
        <main id="mount">${content}</main>
        ${renderScripts(scripts)}
      </body>
    </html>
  `)
}

export default ({ assets }) => (route) => (
  Promise.resolve({
    result: renderDocument({
      content: renderToString(<App />),
      head: Helmet.rewind(),
      assets
    })
  })
)
