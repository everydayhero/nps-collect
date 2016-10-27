import React, { PropTypes } from 'react'
import { css } from 'aphrodite'

import styles from './styles'

const RatingButton = ({
  score,
  handleSelected,
  selected
}) => (
  <label htmlFor={`npsScore_${score}`} className={css(styles.label, selected && styles.selected)}>
    {score}
    <input
      type='radio'
      id={`npsScore_${score}`}
      name='npsScore'
      value={score}
      className={css(styles.radio)}
      onClick={() => handleSelected(selected ? -1 : score)}
    />
  </label>
)

RatingButton.propTypes = {
  score: PropTypes.number.isRequired,
  handleSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

export default RatingButton
