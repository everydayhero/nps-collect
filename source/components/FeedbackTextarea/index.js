import React, { PropTypes } from 'react'
import css from 'cxsync'
import Textarea from 'react-textarea-autosize'

import styles from './styles'

const FeedbackTextarea = ({
  text,
  handleChanged
}) => (
  <Textarea
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
