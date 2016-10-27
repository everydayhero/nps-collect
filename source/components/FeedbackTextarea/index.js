import React, { PropTypes } from 'react'
import { style as css } from 'glamor'

import styles from './styles'

const FeedbackTextarea = ({
  text,
  handleChanged
}) => (
  <textarea
    autoFocus
    value={text}
    className={css(styles.textarea)}
    id='npsFeedback'
    name='npsFeedback'
    onChange={handleChanged}
  />
)

FeedbackTextarea.propTypes = {
  text: PropTypes.string,
  handleChanged: PropTypes.func
}

export default FeedbackTextarea
