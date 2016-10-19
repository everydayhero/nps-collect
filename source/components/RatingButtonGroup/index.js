import React from 'react'
import RadialList from 'react-radial-list'

import styles from './styles'
import RatingButton from '../RatingButton'

const RatingButtonGroup = ({
  handleScoreSelected,
  selectedItemIndex
}) => (
  <div id='npsScoreGroup'>
    <RadialList
      items={npsRange.map(score => (
        <RatingButton
          key={score}
          score={score}
          handleSelected={handleScoreSelected}
        />
      ))}
      offsetDegrees={99}
      selectedItemIndex={selectedItemIndex}
      collapsed={selectedItemIndex > -1}
      listStyles={styles.radialList}
    />
  </div>
)

RatingButtonGroup.propTypes = {
  handleScoreSelected: React.PropTypes.func.isRequired
}

export default RatingButtonGroup

const npsRange = new Array(11).fill().map((_, i) => i)
