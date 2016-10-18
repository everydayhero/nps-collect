import React from 'react'
import assert from 'power-assert'
import { shallow } from 'enzyme'

import images from '../../../images'
import Preamble from '../'

describe('Preamble display component', () => {
  it('should render a clap icon if score is not selected', () => {
    const icon = shallow(<Preamble />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.clap.src)
    assert(icon.prop('alt') === images.clap.alt)
    assert(icon.prop('className') === images.clap.className)
  })

  it('should render a chat icon if score is selected', () => {
    const icon = shallow(<Preamble scoreSelected />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.chat.src)
    assert(icon.prop('alt') === images.chat.alt)
    assert(icon.prop('className') === images.chat.className)
  })

  it('should render request for feedback text if score is not selected', () => {
    const wrapper = shallow(<Preamble />)

    assert(wrapper.text() ===
      'Thank you for donating with Everydayhero. You\'re awesome!'
      + 'If you have a second, we\'d value your feedback.')
  })

  it('should render thanks for feedback if score selected', () => {
    const wrapper = shallow(<Preamble scoreSelected />)

    assert(wrapper.text() === 'Thanks for your feedback!')
  })
})
