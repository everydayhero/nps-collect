import React from 'react'
import assert from 'power-assert'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import 'sinon-as-promised'

import * as data from '../../../data'
import RatingButtonGroup from '../../RatingButtonGroup'
import FeedbackSection from '../../FeedbackSection'
import LoadingIndicator from '../../LoadingIndicator'
import NPSCollect from '../'

describe('NPSCollect container component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NPSCollect trackingToken='test-token' />)
    sinon.stub(data, 'sendNPS').resolves()
  })

  afterEach(() => {
    data.sendNPS.restore()
  })

  it('should render as a form', () => {
    assert(wrapper.is('form'))
  })

  it('should render a RatingButtonGroup', () => {
    assert(wrapper.find(RatingButtonGroup).length === 1)
  })

  it('should pass handleScoreSelected prop down to RatingButtonGroup', () => {
    const npsCollect = wrapper.instance()
    const ratingButtonGroup = wrapper.find(RatingButtonGroup)

    assert(npsCollect.handleScoreSelected === ratingButtonGroup.prop('handleScoreSelected'))
  })

  it('should not render a FeedbackSection initially', () => {
    assert(wrapper.find(FeedbackSection).length === 0)
  })

  it('should render a FeedbackSection if the score is lower than 9', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(7)
    wrapper.update()

    assert(wrapper.find(FeedbackSection).length === 1)
  })

  it('should not render FeedbackSection if score is greater than 9', () => {
    const npsCollect = wrapper.instance()
    sinon.stub(npsCollect, 'submitFeedback')

    npsCollect.handleScoreSelected(9)
    wrapper.update()

    assert(wrapper.find(FeedbackSection).length === 0)
  })

  it('passes handleFeedbackChanged down to FeedbackSection', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(8)
    wrapper.update()
    const feedbackSection = wrapper.find(FeedbackSection)

    assert(npsCollect.handleFeedbackChanged === feedbackSection.prop('handleFeedbackChanged'))
  })

  it('should pass submitFeedback down to FeedbackSection', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(8)
    wrapper.update()
    const feedbackSection = wrapper.find(FeedbackSection)

    assert(npsCollect.submitFeedback === feedbackSection.prop('handleFeedbackSubmitted'))
  })

  it('should set score into local state when user selects a score', () => {
    const npsCollect = wrapper.instance()
    npsCollect.handleScoreSelected(8)

    assert(wrapper.state('score') === 8)
  })

  it('should set feedback value into local state when user enters feedback', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleFeedbackChanged({ target: { value: 'test feedback' } })

    assert(wrapper.state('feedback') === 'test feedback')
  })

  it('should send score and feedback via the sendNPS data function', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(5)
    npsCollect.handleFeedbackChanged({ target: { value: 'Try again' } })
    npsCollect.submitFeedback()

    assert(data.sendNPS.calledWith(5, 'Try again', 'test-token'))
  })

  it('should set sending on state when submitting feedback', () => {
    const npsCollect = wrapper.instance()

    npsCollect.submitFeedback()

    assert(wrapper.state('sending'))
  })

  it('should unset sending and sets submitted state on request completion', async () => {
    const npsCollect = wrapper.instance()

    await npsCollect.submitFeedback()
    wrapper.update()

    assert(wrapper.state('sending') === false)
    assert(wrapper.state('submitted'))
  })

  it('should render a LoadingIndicator when sending', () => {
    const npsCollect = wrapper.instance()

    npsCollect.submitFeedback()
    wrapper.update()

    assert(wrapper.find(LoadingIndicator).length === 1)
  })
})
