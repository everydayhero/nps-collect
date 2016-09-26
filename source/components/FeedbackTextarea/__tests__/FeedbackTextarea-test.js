import React from 'react'
import test from 'ava'
import { stub } from 'sinon'
import { shallow } from 'enzyme'

import FeedbackTextarea from '../'

test('renders as a Textarea', t => {
  const wrapper = shallow(<FeedbackTextarea handleChanged={() => {}} />)

  t.true(wrapper.is('textarea'))
})

test('calls handleChanged on input change', t => {
  const changeStub = stub()
  const wrapper = shallow(<FeedbackTextarea handleChanged={changeStub} />)

  wrapper.find('textarea').simulate('change', { target: { value: 'Test value' } })

  t.true(changeStub.called)
})
