import React from 'react'
import { SlideVertical, Fade } from 'hero-ui/atoms/Transitions'
import css from 'cxsync'

import styles from './styles'
import FeedbackIcon from '../FeedbackIcon'

const scoreShowFeedback = () => (
  <div key='thanks' className={css(styles.preamble)}>
    <p>{'Thank you for donating with Everydayhero. You\'re awesome!'}</p>
    <p>{'If you have a second, we\'d value your feedback.'}</p>
  </div>
)

const preambleIcon = (score, completed) => {
  if (completed || score > 8) {
    return 'heart'
  } else if (score < 0) {
    return 'clap'
  }

  return 'chat'
}

const Preamble = ({
  score = -1,
  completed = false
}) => {
  const icon = preambleIcon(score, completed)
  return (
    <section>
      <div className={css(styles.header)}>
        <Fade>
          <div key={icon}>
            <FeedbackIcon icon={icon} />
          </div>
        </Fade>
      </div>

      <SlideVertical>
        {score < 0 && scoreShowFeedback() }
      </SlideVertical>
    </section>
  )
}

Preamble.propTypes = {
  score: React.PropTypes.number,
  completed: React.PropTypes.bool
}

export default Preamble
