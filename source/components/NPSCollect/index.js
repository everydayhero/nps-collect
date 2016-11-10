import React from 'react'
import css from 'cxsync'
import { SlideVertical } from 'hero-ui/atoms/Transitions'

import { sendNPSScore, sendNPSFeedback } from '../../data'
import RatingButtonGroup from '../RatingButtonGroup'
import FeedbackSection from '../FeedbackSection'
import Preamble from '../Preamble'
import styles from './styles'
import './base.css'

class NPSCollect extends React.Component {
  constructor () {
    super()

    this.state = {
      sending: false,
      submittedScore: false,
      submittedFeedback: false,
      score: -1,
      errored: false
    }

    this.submitFeedback = this.submitFeedback.bind(this)
    this.submitScore = this.submitScore.bind(this)
    this.submitError = this.submitError.bind(this)
    this.handleFeedbackChanged = this.handleFeedbackChanged.bind(this)
    this.handleScoreSelected = this.handleScoreSelected.bind(this)
  }

  submitError (err) {
    console.error('Failed to submit feedback', err.message)
    this.setState({ sending: false, errored: true })
  }

  submitScore (score) {
    const { pageId, userId } = this.props

    this.setState({ sending: true })

    return sendNPSScore({ pageId, userId, score }).then(() => {
      this.setState({ sending: false, submittedScore: true })
    }).catch(this.submitError)
  }

  submitFeedback () {
    const { feedback } = this.state
    const { pageId, userId } = this.props

    this.setState({ sending: true })

    return sendNPSFeedback({ pageId, userId, feedback }).then(() => {
      this.setState({ sending: false, submittedFeedback: true })
    }).catch((err) => {
      this.setState({ sending: false, submittedFeedback: true })
      this.submitError(err)
    })
  }

  handleScoreSelected (score) {
    this.setState({ score })
    this.submitScore(score)
  }

  handleFeedbackChanged ({target: {value: feedback}}) {
    this.setState({ feedback })
  }

  componentDidMount () {
    const { selectedScore } = this.props
    if (selectedScore) {
      this.handleScoreSelected(parseInt(selectedScore))
    }
  }

  render () {
    const {
      sending,
      score,
      feedback,
      submittedFeedback,
      submittedScore } = this.state
    const { images } = this.props
    const scoreSelected = score !== -1
    const showFeedbackInput = score > -1 && score < 9 && !submittedFeedback
    const submitButtonText = (!sending && !submittedFeedback)
      ? 'Send Feedback' : 'Sending Feedback…'

    return (
      <form className={css(styles.form)}>
        <Preamble images={images} score={score} completed={submittedFeedback && submittedScore} />

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
                submitDisabled={sending}
                submitText={submitButtonText}
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
  userId: React.PropTypes.string.isRequired,
  images: React.PropTypes.object.isRequired,
  selectedScore: React.PropTypes.string
}

export default NPSCollect
