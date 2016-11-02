import React from 'react'
import images from '../../images'
import styles from './styles'
import css from 'cxsync'

const FeedbackIcon = ({
  icon
}) => (<img {...images[icon]} className={css(styles.headerImg)} />)

FeedbackIcon.propTypes = {
  icon: React.PropTypes.string.isRequired
}

export default FeedbackIcon
