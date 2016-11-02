import React from 'react'
import { SlideVertical, Fade } from 'hero-ui/atoms/Transitions'
import css from 'cxsync'

import styles from './styles'
import FeedbackIcon from '../FeedbackIcon'

const scoreComplete = () => (
  <div key='thanks' className={css(styles.preamble)}>
    <p>Thanks for your feedback!</p>
  </div>
)

const scoreShowFeedback = () => (
  <div key='thanks' className={css(styles.preamble)}>
    <p>{'Thank you for donating with Everydayhero. You\'re awesome!'}</p>
    <p>{'If you have a second, we\'d value your feedback.'}</p>
  </div>
)

const preambleIcon = (score) => {
  if (score < 0) {
    return 'clap'
  } else if (score > 8) {
    return 'heart'
  }

  return 'chat'
}

const Preamble = ({
  score = -1
}) => {
  const icon = preambleIcon(score)
  return (
    <section>
      <div className={css(styles.header)}>
        <Fade>
          <div>
            <FeedbackIcon icon={icon} />
          </div>
        </Fade>
      </div>

      <SlideVertical>
        {score >= 0 ? scoreComplete() : scoreShowFeedback() }
      </SlideVertical>
    </section>
  )
}

Preamble.propTypes = {
  score: React.PropTypes.number
}

export default Preamble
