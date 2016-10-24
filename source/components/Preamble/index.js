import React from 'react'
import { SlideVertical, Fade } from 'hero-ui/atoms/Transitions'
import css from 'cxsync'

import styles from './styles'
import images from '../../images'

const Preamble = ({
  scoreSelected = false
}) => {
  return (
    <section>
      <div className={css(styles.header)}>
        <Fade>
          {scoreSelected
            ? <img {...images.chat} className={css(styles.headerImg)} key='chat' />
            : <img {...images.clap} className={css(styles.headerImg)} key='clap' />
          }
        </Fade>
      </div>

      <SlideVertical>
        {!scoreSelected &&
          <div key='thanks' className={css(styles.preamble)}>
            <p>{'Thank you for donating with Everydayhero. You\'re awesome!'}</p>
            <p>{'If you have a second, we\'d value your feedback.'}</p>
          </div>
        }
      </SlideVertical>
    </section>
  )
}

Preamble.propTypes = {
  scoreSelected: React.PropTypes.bool
}

export default Preamble
