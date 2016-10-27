import React, { PropTypes } from 'react'
import { css } from 'aphrodite'

import styles from './styles'

const SubmitButton = ({
  handleClicked
}) => (
  <button
    className={css(styles.button)}
    type='submit'
    onClick={({preventDefault}) => {
      preventDefault()
      handleClicked()
    }}
  >
    Submit Response
  </button>
)

SubmitButton.propTypes = {
  handleClicked: PropTypes.func.isRequired
}

export default SubmitButton
