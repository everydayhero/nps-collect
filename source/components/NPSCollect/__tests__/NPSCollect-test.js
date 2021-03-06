import React from 'react'
import assert from 'power-assert'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import 'sinon-as-promised'

import images from '../../../images'
import RatingButtonGroup from '../../RatingButtonGroup'
import FeedbackSection from '../../FeedbackSection'
import NPSCollect from '../'

const data = {
  sendNPSScore: sinon.stub().resolves(),
  sendNPSFeedback: sinon.stub().resolves()
}

describe('NPSCollect container component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <NPSCollect
        analytics={data}
        pageId='test-page'
        userId='test-user'
        homepage='http://www.everydayhero.com'
      />
    )
  })

  afterEach(() => {
    data.sendNPSScore.reset()
    data.sendNPSFeedback.reset()
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

  it('should send feedback via the sendNPSFeedback data function', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(5)
    npsCollect.handleFeedbackChanged({ target: { value: 'Try again' } })
    npsCollect.submitFeedback()

    assert(data.sendNPSFeedback.calledWith(
      { homepage: 'http://www.everydayhero.com', pageId: 'test-page', userId: 'test-user', feedback: 'Try again' }))
  })

  it('should send score the sendNPSScore data function', () => {
    const npsCollect = wrapper.instance()

    npsCollect.handleScoreSelected(5)
    npsCollect.handleFeedbackChanged({ target: { value: 'Try again' } })
    npsCollect.submitFeedback()

    assert(data.sendNPSScore.calledWith(
      { homepage: 'http://www.everydayhero.com', pageId: 'test-page', userId: 'test-user', score: 5 }))
  })

  it('should set sending on state when submitting feedback', () => {
    const npsCollect = wrapper.instance()

    npsCollect.submitFeedback()

    assert(wrapper.state('sending'))
  })

  it('should unset sending and sets submittedFeedback state on successful request completion', async () => {
    const npsCollect = wrapper.instance()

    await npsCollect.submitFeedback()
    wrapper.update()

    assert(wrapper.state('sending') === false)
    assert(wrapper.state('submittedFeedback'))
  })

  it('should unset sending and sets submittedScore state on successful request completion', async () => {
    const npsCollect = wrapper.instance()

    await npsCollect.submitScore()
    wrapper.update()

    assert(wrapper.state('sending') === false)
    assert(wrapper.state('submittedScore'))
  })

  describe('sets params', () => {
    let handleScoreSelected

    before(() => {
      handleScoreSelected = sinon.spy()
      sinon.stub(NPSCollect.prototype, 'handleScoreSelected', handleScoreSelected)
    })

    after(() => {
      NPSCollect.prototype.handleScoreSelected.reset()
    })

    it('should call handleScoreSelected with the selected score', () => {
      mount(
        <NPSCollect
          images={images}
          pageId='test-page'
          userId='test-user'
          selectedScore='8'
        />
      )

      assert(handleScoreSelected.calledWith(8))
    })
  })
})

describe('NPSContainerComponent error cases', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <NPSCollect
        analytics={data}
        pageId='test-page'
        userId='test-user'
        homepage='http://www.everydayhero.com'
      />
    )
    data.sendNPSFeedback.resolves(() => {
      throw new Error('Just Nothing')
    })
  })

  afterEach(() => {
    data.sendNPSFeedback.reset()
  })

  it('should still mark feedback submitted on error', async () => {
    const npsCollect = wrapper.instance()

    await npsCollect.submitFeedback()
    wrapper.update()

    assert(wrapper.state('submittedFeedback'))
  })
})
