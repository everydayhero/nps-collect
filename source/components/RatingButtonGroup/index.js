import React from 'react'

import RatingButton from '../RatingButton'

const RatingButtonGroup = ({
  handleScoreSelected
}) => (
  <div id='npsScoreGroup'>
    {npsRange.map(score => (
      <RatingButton
        key={score}
        score={score}
        handleSelected={handleScoreSelected}
      />
    ))}
  </div>
)

RatingButtonGroup.propTypes = {
  handleScoreSelected: React.PropTypes.func.isRequired
}

export default RatingButtonGroup

const npsRange = new Array(11).fill().map((_, i) => i)
