import React from 'react'
import test from 'ava'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'

import RatingButton from '../'

let wrapper

test.beforeEach(() => {
  wrapper = shallow(<RatingButton score={9} handleSelected={() => {}} />)
})

test('renders as a radio input inside a label', t => {
  const label = wrapper.find('label')
  t.true(label.length === 1, 'Must render a label element')
  t.true(label.find('input[type="radio"]').length === 1,
    'Label should contain a radio input')
})

test('renders the score as the value for the radio button', t => {
  const radio = wrapper.find('input[type="radio"]')
  t.is(radio.prop('value'), 9)
})

test('renders the score in the radio button id', t => {
  const radio = wrapper.find('input[type="radio"]')
  t.regex(radio.prop('id'), /9/)
})

test('names the radio button "npsScore"', t => {
  const radio = wrapper.find('input[type="radio"]')
  t.is(radio.prop('name'), 'npsScore')
})

test('calls handleSelected when radio button is clicked', t => {
  const clickStub = stub()
  wrapper = mount(<RatingButton score={6} handleSelected={clickStub} />)
  const radio = wrapper.find('input[type="radio"]')

  radio.simulate('click')
  t.true(clickStub.called)
})

test('calls handleSelected with the score value', t => {
  const clickStub = stub()
  wrapper = mount(<RatingButton score={6} handleSelected={clickStub} />)

  wrapper.find('input[type="radio"]').simulate('click')
  t.true(clickStub.calledWith(wrapper.prop('score')))
})
