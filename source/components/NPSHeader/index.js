import React from 'react'
import css from 'cxsync'
import styles from './styles'
import images from '../../images'
import 'minimal.css'

const NPSHeader = ({
  homepage
}) => (
  <header className={css(styles.header)}>
    <a href={homepage}>
      <img {...images.logo} className={css(styles.headerImg)} />
    </a>
  </header>
)

export default NPSHeader

