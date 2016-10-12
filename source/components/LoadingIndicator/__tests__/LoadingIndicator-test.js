import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import LoadingIndicator from '../'

test('renders a spinner element and label by default', t => {
  const wrapper = shallow(<LoadingIndicator />)

  t.truthy(wrapper.find('div.progress').length, 'Must contain spinner element')
  t.regex(wrapper.text(), /Sending feedback/)
})

test('removes spinner and renders Thank you message when complete', t => {
  const wrapper = shallow(<LoadingIndicator complete />)

  t.falsy(wrapper.find('div.progress').length)
  t.regex(wrapper.text(), /Thank you/)
})
