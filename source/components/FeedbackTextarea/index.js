import React from 'react'

const FeedbackTextarea = ({
  handleChanged
}) => (
  <textarea
    id='npsFeedback'
    name='npsFeedback'
    onChange={handleChanged}
  />
)

FeedbackTextarea.propTypes = {
  handleChanged: React.PropTypes.func
}

export default FeedbackTextarea
