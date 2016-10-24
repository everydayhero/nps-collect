import React from 'react'
import assert from 'power-assert'
import { shallow } from 'enzyme'

import LoadingIndicator from '../'

describe('LoadingIndicator display component', () => {
  it('should render a spinner element and label by default', () => {
    const wrapper = shallow(<LoadingIndicator />)

    assert(wrapper.find('div.progress').length, 'Must contain spinner element')
    assert(wrapper.text().match(/Sending feedback/))
  })

  it('should remove spinner and render Thank you message when complete', () => {
    const wrapper = shallow(<LoadingIndicator complete />)

    assert(wrapper.find('div.progress').length === 0)
    assert(wrapper.text().match(/Thank you/))
  })
})
