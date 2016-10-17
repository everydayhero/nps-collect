import React from 'react'
import assert from 'power-assert'
import { shallow } from 'enzyme'

import FeedbackSection from '../'
import FeedbackTextarea from '../../FeedbackTextarea'
import SubmitButton from '../../SubmitButton'

describe('FeedbackSection display component', () => {
  it('should render a FeedbackTextarea', () => {
    const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={() => {}} />)

    assert(wrapper.find(FeedbackTextarea).length === 1)
  })

  it('should render a SubmitButton', () => {
    const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={() => {}} />)

    assert(wrapper.find(SubmitButton).length === 1)
  })

  it('should pass handleFeedbackSubmitted to SubmitButton', () => {
    const feedbackSubmitted = () => {}
    const wrapper = shallow(<FeedbackSection handleFeedbackSubmitted={feedbackSubmitted} />)

    assert(wrapper.find(SubmitButton).prop('handleClicked') === feedbackSubmitted)
  })

  it('should pass handleFeedbackChanged to FeedbackTextarea', () => {
    const feedbackChanged = () => {}
    const wrapper = shallow(
      <FeedbackSection
        handleFeedbackSubmitted={() => {}}
        handleFeedbackChanged={feedbackChanged}
      />
    )

    assert(wrapper.find(FeedbackTextarea).prop('handleChanged') === feedbackChanged)
  })
})
