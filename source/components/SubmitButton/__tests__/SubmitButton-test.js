import React from 'react'
import test from 'ava'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'

import SubmitButton from '../'

test('renders a submit button', t => {
  const wrapper = shallow(<SubmitButton handleClicked={() => {}} />)

  t.true(wrapper.is('button[type="submit"]'))
})

test('calls handleClicked on click', t => {
  const clickStub = stub()
  const wrapper = shallow(<SubmitButton handleClicked={clickStub} />)

  wrapper.simulate('click', { preventDefault: () => {} })

  t.true(clickStub.called)
})

test('prevents the default event for a submit button', t => {
  const wrapper = mount(<SubmitButton handleClicked={() => {}} />)

  const preventDefaultStub = stub()
  wrapper.simulate('click', { preventDefault: preventDefaultStub })

  t.true(preventDefaultStub.called)
})
