import React from 'react'
import { render } from 'react-dom'
import images from './images'

import NPSCollect from './components/NPSCollect'

const mount = document.getElementById('mount')

render(<NPSCollect images={images} pageId={4} userId={5} />, mount)
