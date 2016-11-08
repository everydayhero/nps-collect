import React from 'react'
import styles from './styles'
import css from 'cxsync'

const FeedbackIcon = ({
  icon,
  images
}) => (<img {...images[icon]} className={css(styles.headerImg)} />)

FeedbackIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  images: React.PropTypes.object.isRequired
}

export default FeedbackIcon
