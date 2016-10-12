import React from 'react'

const SubmitButton = ({
  handleClicked
}) => (
  <button
    type='submit'
    onClick={event => {
      event.preventDefault()
      handleClicked()
    }}
  >
    Send Feedback
  </button>
)

SubmitButton.propTypes = {
  handleClicked: React.PropTypes.func.isRequired
}

export default SubmitButton
