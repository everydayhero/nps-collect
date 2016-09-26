import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import FeedbackSection from '../'
import FeedbackTextarea from '../../FeedbackTextarea'
import SubmitButton from '../../SubmitButton'

test('renders a FeedbackTextarea', t => {
  const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={() => {}} />)

  t.true(wrapper.find(FeedbackTextarea).length === 1)
})

test('renders a SubmitButton', t => {
  const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={() => {}} />)

  t.true(wrapper.find(SubmitButton).length === 1)
})

test('passes handleFeedbackSubmitted to SubmitButton', t => {
  const feedbackSubmitted = () => {}
  const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={feedbackSubmitted} />)

  t.is(wrapper.find(SubmitButton).prop('handleClicked'), feedbackSubmitted)
})

test('passes handleFeedbackChanged to FeedbackTextarea', t => {
  const feedbackChanged = () => {}
  const wrapper = shallow(
    <FeedbackSection
      handleFeedbackSubmitted={() => {}}
      handleFeedbackChanged={feedbackChanged}
    />
  )

  t.is(wrapper.find(FeedbackTextarea).prop('handleChanged'), feedbackChanged)
})
