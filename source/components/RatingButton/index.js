import React from 'react'
import css from 'cxsync'

import styles from './styles'

const RatingButton = ({
  score,
  handleSelected
}) => (
  <label htmlFor={`npsScore_${score}`} className={css(styles.label)}>
    {score}
    <input
      type='radio'
      id={`npsScore_${score}`}
      name='npsScore'
      value={score}
      className={css(styles.radio)}
      onClick={() => handleSelected(score)}
    />
  </label>
)

RatingButton.propTypes = {
  score: React.PropTypes.number.isRequired,
  handleSelected: React.PropTypes.func.isRequired
}

export default RatingButton
