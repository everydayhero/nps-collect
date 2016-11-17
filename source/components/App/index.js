import React from 'react'
import Helmet from 'react-helmet'
import images from '../../images'
import { links, metatags } from '../../lib/header'
import 'minimal.css'

import NPSCollect from '../NPSCollect'
import NPSHeader from '../NPSHeader'
export default ({ query, analytics }) => (
  <div>
    <Helmet
      title='everydayhero Feedback'
      meta={metatags}
      link={links}
    />
    <NPSHeader images={images} homepage='http://www.everydayhero.com' />
    <NPSCollect images={images} analytics={analytics} {...query} />
  </div>
)
