import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { parse } from 'query-string'

const mount = document.getElementById('mount')
const query = parse(window.location.search)

render(<App query={query} />, mount)
