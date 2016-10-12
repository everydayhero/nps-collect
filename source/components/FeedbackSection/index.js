import React from 'react'

import FeedbackTextarea from '../FeedbackTextarea'
import SubmitButton from '../SubmitButton'

class FeedbackSection extends React.Component {
  render () {
    const { handleFeedbackChanged, handleFeedbackSubmitted } = this.props

    return (
      <div>
        <FeedbackTextarea handleChanged={handleFeedbackChanged} />

        <SubmitButton handleClicked={handleFeedbackSubmitted} />
      </div>
    )
  }
}

FeedbackSection.propTypes = {
  handleFeedbackChanged: React.PropTypes.func,
  handleFeedbackSubmitted: React.PropTypes.func.isRequired
}

export default FeedbackSection
