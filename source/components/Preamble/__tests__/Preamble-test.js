import React from 'react'
import assert from 'power-assert'
import { mount } from 'enzyme'

import images from '../../../images'
import Preamble from '../'

describe('Preamble display component', () => {
  it('should render a clap icon if score is not selected', () => {
    const icon = mount(<Preamble />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.clap.src)
    assert(icon.prop('alt') === images.clap.alt)
  })

  it('should render a chat icon if score between 0 and 8 is selected', () => {
    const icon = mount(<Preamble score={5} />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.chat.src)
    assert(icon.prop('alt') === images.chat.alt)
  })

  it('should render a heart icon if score greater than 8 is selected', () => {
    const icon = mount(<Preamble score={9} />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.heart.src)
    assert(icon.prop('alt') === images.heart.alt)
  })

  it('should render a heart icon when completed', () => {
    const icon = mount(<Preamble completed />).find('img')

    assert(icon.length === 1)
    assert(icon.prop('src') === images.heart.src)
    assert(icon.prop('alt') === images.heart.alt)
  })

  it('should render request for feedback text if score is -1', () => {
    const wrapper = mount(<Preamble score={-1} />)

    assert(wrapper.text() ===
      'Thank you for donating with Everydayhero. You\'re awesome!' +
      'If you have a second, we\'d value your feedback.')
  })
})
