import React from 'react'
import FeedbackIcon from '../FeedbackIcon'
import css from 'cxsync'
import styles from './styles'
import 'minimal.css'

const NPSHeader = ({
  images, homepage
}) => (
  <header className={css(styles.header)}>
    <a href={homepage}>
      <img {...images.logo} className={css(styles.headerImg)} />
    </a>
  </header>
)

export default NPSHeader

