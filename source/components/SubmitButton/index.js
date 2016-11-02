import React, { PropTypes } from 'react'
import css from 'cxsync'

import styles from './styles'

const SubmitButton = ({
  handleClicked,
  text = 'Send Feedback',
  disabled = false
}) => (
  <button
    className={css(styles.button)}
    type='submit'
    onClick={({preventDefault}) => {
      preventDefault()
      handleClicked()
    }}
    disabled={disabled}
  >
    {text}
  </button>
)

SubmitButton.propTypes = {
  handleClicked: PropTypes.func.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.bool
}

export default SubmitButton
