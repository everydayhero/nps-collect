import React, { PropTypes } from 'react'
import { css } from 'aphrodite'

import styles from './styles'
import FeedbackTextarea from '../FeedbackTextarea'
import SubmitButton from '../SubmitButton'

const FeedbackSection = ({
  feedback,
  handleFeedbackChanged,
  handleFeedbackSubmitted
}) => (
  <div className={css(styles.section)}>
    <p className={css(styles.question)}>{'Any particular reason you gave this feedback?'}</p>
    <FeedbackTextarea text={feedback} handleChanged={handleFeedbackChanged} />
    <SubmitButton handleClicked={handleFeedbackSubmitted} />
  </div>
)

FeedbackSection.propTypes = {
  feedback: PropTypes.string,
  handleFeedbackChanged: PropTypes.func,
  handleFeedbackSubmitted: PropTypes.func.isRequired
}

export default FeedbackSection
