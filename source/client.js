import React from 'react'
import { render } from 'react-dom'
import Helmet from 'react-helmet'
import images from './images'
import { links, metatags } from './lib/header'
import 'minimal.css'
import { parse } from 'query-string'

import NPSCollect from './components/NPSCollect'
import NPSHeader from './components/NPSHeader'

const mount = document.getElementById('mount')

const pageDetails = parse(window.location.search)

render(
  <div>
    <Helmet
      title='everydayhero Feedback'
      meta={metatags}
      link={links}
    />
    <NPSHeader images={images} homepage='http://www.everydayhero.com' />
    <NPSCollect images={images} {...pageDetails} />
  </div>, mount)
