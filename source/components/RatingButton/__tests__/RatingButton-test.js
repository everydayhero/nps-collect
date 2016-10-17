import React from 'react'
import assert from 'power-assert'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'

import RatingButton from '../'

describe('RatingButton display component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<RatingButton score={9} handleSelected={() => {}} />)
  })

  it('should render as a radio input inside a label', () => {
    const label = wrapper.find('label')
    assert(label.length === 1, 'Must render a label element')
    assert(label.find('input[type="radio"]').length === 1,
      'Label should contain a radio input')
    assert(label.text() === '9')
  })

  it('should render the score as the value for the radio button', () => {
    const radio = wrapper.find('input[type="radio"]')
    assert(radio.prop('value') === 9)
  })

  it('should render the score in the radio button id', () => {
    const radio = wrapper.find('input[type="radio"]')
    assert(radio.prop('id').match(/9/))
  })

  it('should name the radio button "npsScore"', () => {
    const radio = wrapper.find('input[type="radio"]')
    assert(radio.prop('name') === 'npsScore')
  })

  it('should call handleSelected when radio button is clicked', () => {
    const clickStub = stub()
    wrapper = mount(<RatingButton score={6} handleSelected={clickStub} />)
    const radio = wrapper.find('input[type="radio"]')

    radio.simulate('click')
    assert(clickStub.called)
  })

  it('should call handleSelected with the score value', () => {
    const clickStub = stub()
    wrapper = mount(<RatingButton score={6} handleSelected={clickStub} />)

    wrapper.find('input[type="radio"]').simulate('click')
    assert(clickStub.calledWith(wrapper.prop('score')))
  })
})
