import React from 'react'
import assert from 'power-assert'
import { stub } from 'sinon'
import { mount } from 'enzyme'

import FeedbackTextarea from '../'

describe('FeedbackTextarea', () => {
  it('should render as a Textarea', () => {
    const wrapper = mount(<FeedbackTextarea handleChanged={() => {}} />)

    assert(wrapper.find('textarea'))
  })

  it('should call handleChanged on input change', () => {
    const changeStub = stub()
    const wrapper = mount(<FeedbackTextarea handleChanged={changeStub} />)

    wrapper.find('textarea').simulate('change', { target: { value: 'Test value' } })

    assert(changeStub.called)
  })
})
