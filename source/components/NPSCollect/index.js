import React from 'react'
import css from 'cxsync'
import { SlideVertical } from 'hero-ui/atoms/Transitions'
import 'minimal.css'
import './base.css'

import { sendNPSScore, sendNPSFeedback } from '../../data'
import images from '../../images'
import RatingButtonGroup from '../RatingButtonGroup'
import FeedbackSection from '../FeedbackSection'
import LoadingIndicator from '../LoadingIndicator'
import Preamble from '../Preamble'
import styles from './styles'

class NPSCollect extends React.Component {
  constructor () {
    super()

    this.state = { sending: false, score: -1 }

    this.submitFeedback = this.submitFeedback.bind(this)
    this.submitScore = this.submitScore.bind(this)
    this.handleFeedbackChanged = this.handleFeedbackChanged.bind(this)
    this.handleScoreSelected = this.handleScoreSelected.bind(this)
  }

  submitScore () {
    const { score } = this.state
    const { pageId, userId } = this.props

    this.setState({ sending: true })

    return sendNPSScore(pageId, userId, score).then(() => {
      this.setState({ sending: false })
    })
  }

  submitFeedback () {
    const { feedback } = this.state
    const { pageId, userId } = this.props

    this.setState({ sending: true })

    return sendNPSFeedback(pageId, userId, feedback).then(() => {
      console.log('Sent')
      this.setState({ sending: false })
    })
  }

  handleScoreSelected (score) {
    this.setState({ score })
    this.submitScore()
  }

  handleFeedbackChanged ({target: {value: feedback}}) {
    this.setState({ feedback })
  }

  render () {
    const { sending, score, feedback } = this.state
    const scoreSelected = score !== -1
    const showFeedbackInput = score > -1 && score < 9

    return (
      <form className={css(styles.form)}>
        <header className={css(styles.header)}>
          <img {...images.logo} className={css(styles.headerImg)} />
        </header>

        <Preamble score={score} />

        <section>
          <div className={css(styles.question)}>
            <p>{!scoreSelected
              ? 'How likely would you be to recommend us to your friends or family?'
              : 'Thanks for your feedback!'}</p>
          </div>

          <RatingButtonGroup
            handleScoreSelected={this.handleScoreSelected}
            selectedItemIndex={score}
          />

          <SlideVertical>
            {showFeedbackInput &&
              <FeedbackSection
                key='feedback'
                feedback={feedback}
                submitDisabled={!sending}
                submitText='Send Feedback'
                handleFeedbackChanged={this.handleFeedbackChanged}
                handleFeedbackSubmitted={this.submitFeedback}
              />
            }
          </SlideVertical>
        </section>
      </form>
    )
  }
}

NPSCollect.propTypes = {
  pageId: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
}

export default NPSCollect
