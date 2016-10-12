import React from 'react'

const LoadingIndicator = ({
  complete
}) => (
  <div className='loading-indicator'>
    {complete
      ? 'Thank you!'
      : <div className='progress'>{'Sending feedback'}</div>
    }
  </div>
)

LoadingIndicator.propTypes = {
  complete: React.PropTypes.bool
}

LoadingIndicator.defaultProps = {
  complete: false
}

export default LoadingIndicator
