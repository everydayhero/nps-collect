import React from 'react'
import assert from 'power-assert'
import { mount } from 'enzyme'
import NPSHeader from '../'

describe('NPSHeader display component', () => {
  it('must link to the homepage', () => {
    const wrapper = mount(<NPSHeader homepage='sup.com' />)

    assert(wrapper.find('a').prop('href') === 'sup.com')
  })
})
