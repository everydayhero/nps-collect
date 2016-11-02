import React, { PropTypes } from 'react'
import css from 'cxsync'

import styles from './styles'

const SubmitButton = ({
  handleClicked,
  text = 'Send Feedback'
}) => (
  <button
    className={css(styles.button)}
    type='submit'
    onClick={({preventDefault}) => {
      preventDefault()
      handleClicked()
    }}
  >
    {text}
  </button>
)

SubmitButton.propTypes = {
  handleClicked: PropTypes.func.isRequired
}

export default SubmitButton
