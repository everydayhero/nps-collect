import React from 'react'
import assert from 'power-assert'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'

import SubmitButton from '../'

const noop = () => {}

describe('SubmitButton display component', () => {
  it('should render a submit button', () => {
    const wrapper = shallow(<SubmitButton handleClicked={noop} />)

    assert(wrapper.is('button[type="submit"]'))
  })

  it('should render the button label', () => {
    const wrapper = shallow(<SubmitButton handleClicked={noop} text='Wassup' />)

    assert(wrapper.text() === 'Wassup')
  })

  it('should call handleClicked on click', () => {
    const clickStub = stub()
    const wrapper = shallow(<SubmitButton handleClicked={clickStub} />)

    wrapper.simulate('click', { preventDefault: () => {} })

    assert(clickStub.called)
  })

  it('should prevent the default event for a submit button', () => {
    const wrapper = mount(<SubmitButton handleClicked={noop} />)

    const preventDefaultStub = stub()
    wrapper.simulate('click', { preventDefault: preventDefaultStub })

    assert(preventDefaultStub.called)
  })

  it('should disable the button', () => {
    const clickStub = stub()
    const wrapper = mount(<SubmitButton disabled handleClicked={clickStub} />)

    wrapper.simulate('click')
    assert(!clickStub.called)
  })
})
