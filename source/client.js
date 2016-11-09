import React from 'react'
import { render } from 'react-dom'
import images from './images'
import 'minimal.css'

import NPSCollect from './components/NPSCollect'
import NPSHeader from './components/NPSHeader'

const mount = document.getElementById('mount')

render(
  <div>
    <NPSHeader images={images} homepage='http://www.everydayhero.com' />
    <NPSCollect images={images} pageId='4' userId='5' />
  </div>
, mount)
