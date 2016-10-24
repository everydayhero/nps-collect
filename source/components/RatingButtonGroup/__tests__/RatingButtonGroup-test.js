import React from 'react'
import assert from 'power-assert'
import { stub } from 'sinon'
import { mount } from 'enzyme'

import RatingButtonGroup from '../'
import RatingButton from '../../RatingButton'

describe('RatingButtonGroup display component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<RatingButtonGroup handleScoreSelected={() => {}} />)
  })

  it('should render 11 rating buttons', () => {
    assert(wrapper.find(RatingButton).length === 11)
  })

  it('should pass the scores 0-11 to the button as props', () => {
    wrapper.find(RatingButton).forEach((ratingButton, i) => {
      assert(ratingButton.prop('score') === i)
    })
  })

  it('should call handleScoreSelected when a radio is clicked', () => {
    const clickStub = stub()
    wrapper = mount(<RatingButtonGroup handleScoreSelected={clickStub} />)
    const ratingButtons = wrapper.find('input[type="radio"]')

    const firstButton = ratingButtons.at(0)
    firstButton.simulate('click')
    assert(clickStub.calledWith(0))

    const secondButton = ratingButtons.at(5)
    secondButton.simulate('click')
    assert(clickStub.calledWith(5))
  })
})
