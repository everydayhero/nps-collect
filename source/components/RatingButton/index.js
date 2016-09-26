import React from 'react'

const RatingButton = ({
  score,
  handleSelected
}) => (
  <label htmlFor={`npsScore_${score}`}>
    <input
      type='radio'
      id={`npsScore_${score}`}
      name='npsScore'
      value={score}
      onClick={() => handleSelected(score)}
    />
  </label>
)

RatingButton.propTypes = {
  score: React.PropTypes.number.isRequired,
  handleSelected: React.PropTypes.func.isRequired
}

export default RatingButton
