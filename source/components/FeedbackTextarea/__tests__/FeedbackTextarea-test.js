import React from 'react'
import assert from 'power-assert'
import { stub } from 'sinon'
import { shallow } from 'enzyme'

import FeedbackTextarea from '../'

describe('FeedbackTextarea', () => {
  it('should render as a Textarea', () => {
    const wrapper = shallow(<FeedbackTextarea handleChanged={() => {}} />)

    assert(wrapper.is('textarea'))
  })

  it('should call handleChanged on input change', () => {
    const changeStub = stub()
    const wrapper = shallow(<FeedbackTextarea handleChanged={changeStub} />)

    wrapper.find('textarea').simulate('change', { target: { value: 'Test value' } })

    assert(changeStub.called)
  })
})
