import React from 'react'
import test from 'ava'
import { stub } from 'sinon'
import { shallow, mount } from 'enzyme'

import RatingButtonGroup from '../'
import RatingButton from '../../RatingButton'

let wrapper

test.beforeEach(() => {
  wrapper = shallow(<RatingButtonGroup handleScoreSelected={() => {}} />)
})

test('renders 11 rating buttons', t => {
  t.is(wrapper.find(RatingButton).length, 11)
})

test('passes the scores 0-11 to the button as props', t => {
  wrapper.find(RatingButton).forEach((ratingButton, i) => {
    t.is(ratingButton.prop('score'), i)
  })
})

test('calls handleScoreSelected when a radio is clicked', t => {
  const clickStub = stub()
  wrapper = mount(<RatingButtonGroup handleScoreSelected={clickStub} />)
  const ratingButtons = wrapper.find('input[type="radio"]')

  const firstButton = ratingButtons.at(0)
  firstButton.simulate('click')
  t.true(clickStub.calledWith(0))

  const secondButton = ratingButtons.at(5)
  secondButton.simulate('click')
  t.true(clickStub.calledWith(5))
})
