import React from 'react'
import css from 'cxsync'

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

    this.state = { sending: false, submitted: false, score: -1 }

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
      this.setState({ submitted: true, sending: false })
    })
  }

  handleScoreSelected (score) {
    this.setState({ score })
    this.submitScore()
  }

  handleFeedbackChanged (event) {
    const feedback = event.target.value
    this.setState({ feedback })
  }

  render () {
    const { sending, submitted, score } = this.state
    const scoreSelected = score !== undefined
    const showFeedbackInput = score > -1 && score < 9

    return (
      <form className={css(styles.form)}>
        <header className={css(styles.header)}>
          <img {...images.logo} />
        </header>

        <Preamble scoreSelected={scoreSelected} />

        <section id='nps-inputs'>
          <p>
            <strong>{'How likely would you be to recommend us to your friends or family?'}</strong>
          </p>

          {sending && <LoadingIndicator complete={submitted} />}

          <RatingButtonGroup
            handleScoreSelected={this.handleScoreSelected}
            selectedItemIndex={score}
          />

          {showFeedbackInput &&
            <FeedbackSection
              handleFeedbackChanged={this.handleFeedbackChanged}
              handleFeedbackSubmitted={this.submitFeedback}
            />
          }
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
