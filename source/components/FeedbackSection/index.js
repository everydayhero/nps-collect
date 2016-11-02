import React, { PropTypes } from 'react'
import css from 'cxsync'

import styles from './styles'
import FeedbackTextarea from '../FeedbackTextarea'
import SubmitButton from '../SubmitButton'

const FeedbackSection = ({
  feedback,
  submitText,
  submitDisabled,
  handleFeedbackChanged,
  handleFeedbackSubmitted
}) => (
  <div className={css(styles.section)}>
    <p className={css(styles.question)}>{'Any particular reason you gave this feedback?'}</p>
    <FeedbackTextarea text={feedback} handleChanged={handleFeedbackChanged} />
    <SubmitButton handleClicked={handleFeedbackSubmitted} disabled={submitDisabled} text={submitText} />
  </div>
)

FeedbackSection.propTypes = {
  feedback: PropTypes.string,
  submitText: PropTypes.string,
  submitDisabled: PropTypes.bool,
  handleFeedbackChanged: PropTypes.func,
  handleFeedbackSubmitted: PropTypes.func.isRequired
}

export default FeedbackSection
