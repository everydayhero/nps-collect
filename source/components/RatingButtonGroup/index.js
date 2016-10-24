import React, { PropTypes } from 'react'
import RadialList from 'react-radial-list'
import merge from 'lodash/merge'
import { SlideVertical } from 'hero-ui/atoms/Transitions'
import css from 'cxsync'

import styles from './styles'
import RatingButton from '../RatingButton'

const npsRange = new Array(11).fill().map((_, i) => i)

const RatingButtonGroup = ({
  handleScoreSelected,
  selectedItemIndex
}) => (
  <div id='npsScoreGroup'>
    <RadialList
      diameter={280}
      arc={340}
      items={npsRange.map(score => (
        <RatingButton
          key={score}
          score={score}
          handleSelected={handleScoreSelected}
          selected={score === selectedItemIndex}
        />
      ))}
      selectedItemIndex={selectedItemIndex}
      collapsed={selectedItemIndex > -1}
      listStyles={merge({}, styles.radialList, (selectedItemIndex > -1) && styles.collapsed)}
    />
    <SlideVertical>
      {selectedItemIndex === -1 &&
        <div key='labels' className={css(styles.labels)}>
          <p>Not likely at all</p>
          <p>Extremely likely</p>
        </div>
      }
    </SlideVertical>
  </div>
)

RatingButtonGroup.propTypes = {
  handleScoreSelected: PropTypes.func.isRequired,
  selectedItemIndex: PropTypes.number
}

export default RatingButtonGroup
