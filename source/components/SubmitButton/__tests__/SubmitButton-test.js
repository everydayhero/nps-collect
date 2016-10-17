import React from 'react'
import assert from 'power-assert'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'

import SubmitButton from '../'

describe('SubmitButton display component', () => {
  it('should render a submit button', () => {
    const wrapper = shallow(<SubmitButton handleClicked={() => {}} />)

    assert(wrapper.is('button[type="submit"]'))
    assert(wrapper.text() === 'Send Feedback')
  })

  it('should call handleClicked on click', () => {
    const clickStub = stub()
    const wrapper = shallow(<SubmitButton handleClicked={clickStub} />)

    wrapper.simulate('click', { preventDefault: () => {} })

    assert(clickStub.called)
  })

  it('should prevent the default event for a submit button', () => {
    const wrapper = mount(<SubmitButton handleClicked={() => {}} />)

    const preventDefaultStub = stub()
    wrapper.simulate('click', { preventDefault: preventDefaultStub })

    assert(preventDefaultStub.called)
  })
})
