import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import 'sinon-as-promised'

import * as data from '../../../data'
import RatingButtonGroup from '../../RatingButtonGroup'
import FeedbackSection from '../../FeedbackSection'
import LoadingIndicator from '../../LoadingIndicator'
import NPSCollect from '../'

let wrapper

test.beforeEach(() => {
  wrapper = shallow(<NPSCollect trackingToken='test-token' />)
  sinon.stub(data, 'sendNPS').resolves()
})

test.afterEach(() => {
  data.sendNPS.restore()
})

test('renders as a form', t => {
  t.true(wrapper.is('form'))
})

test('renders a RatingButtonGroup', t => {
  t.true(wrapper.find(RatingButtonGroup).length === 1)
})

test('passes handleScoreSelected prop down to RatingButtonGroup', t => {
  const npsCollect = wrapper.instance()
  const ratingButtonGroup = wrapper.find(RatingButtonGroup)

  t.is(npsCollect.handleScoreSelected, ratingButtonGroup.prop('handleScoreSelected'))
})

test('does not render a FeedbackSection initially', t => {
  t.falsy(wrapper.find(FeedbackSection).length)
})

test('renders a FeedbackSection if the score is lower than 9', t => {
  const npsCollect = wrapper.instance()

  npsCollect.handleScoreSelected(7)
  wrapper.update()

  t.truthy(wrapper.find(FeedbackSection).length)
})

test('does not render FeedbackSection if score is greater than 9', t => {
  const npsCollect = wrapper.instance()
  sinon.stub(npsCollect, 'submitFeedback')

  npsCollect.handleScoreSelected(9)
  wrapper.update()

  t.falsy(wrapper.find(FeedbackSection).length)
})

test('passes handleFeedbackChanged down to FeedbackSection', t => {
  const npsCollect = wrapper.instance()

  npsCollect.handleScoreSelected(8)
  wrapper.update()
  const feedbackSection = wrapper.find(FeedbackSection)

  t.is(npsCollect.handleFeedbackChanged, feedbackSection.prop('handleFeedbackChanged'))
})

test('passes submitFeedback down to FeedbackSection', t => {
  const npsCollect = wrapper.instance()

  npsCollect.handleScoreSelected(8)
  wrapper.update()
  const feedbackSection = wrapper.find(FeedbackSection)

  t.is(npsCollect.submitFeedback, feedbackSection.prop('handleFeedbackSubmitted'))
})

test('sets score into local state when user selects a score', t => {
  const npsCollect = wrapper.instance()
  npsCollect.handleScoreSelected(8)

  t.is(wrapper.state('score'), 8)
})

test('sets feedback value into local state when user enters feedback', t => {
  const npsCollect = wrapper.instance()

  npsCollect.handleFeedbackChanged({ target: { value: 'test feedback' } })

  t.is(wrapper.state('feedback'), 'test feedback')
})

test('sends score and feedback via the sendNPS data function', t => {
  const npsCollect = wrapper.instance()

  npsCollect.handleScoreSelected(5)
  npsCollect.handleFeedbackChanged({ target: { value: 'Try again' } })
  npsCollect.submitFeedback()

  t.true(data.sendNPS.calledWith(5, 'Try again', 'test-token'))
})

test('sets sending on state when submitting feedback', t => {
  const npsCollect = wrapper.instance()

  npsCollect.submitFeedback()

  t.true(wrapper.state('sending'))
})

test('unsets sending and sets submitted state on request completion', async t => {
  const npsCollect = wrapper.instance()

  await npsCollect.submitFeedback()
  wrapper.update()

  t.false(wrapper.state('sending'))
  t.true(wrapper.state('submitted'))
})

test('renders a LoadingIndicator when sending', t => {
  const npsCollect = wrapper.instance()

  npsCollect.submitFeedback()
  wrapper.update()

  t.truthy(wrapper.find(LoadingIndicator).length)
})
