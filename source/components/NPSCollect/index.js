import React from 'react'

import { sendNPSScore, sendNPSFeedback } from '../../data'
import images from '../../images'
import RatingButtonGroup from '../RatingButtonGroup'
import FeedbackSection from '../FeedbackSection'
import LoadingIndicator from '../LoadingIndicator'
import Preamble from '../Preamble'

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
    const { showFeedbackInput, sending, submitted } = this.state

    return (
      <form>
        <header>
          <img className='everydayhero-logo' src='' alt='Everydayhero logo' />
        </header>

        <section id='nps-preamble'>
          <img className='' src='' alt='Clap emoji' />

          <p>
            <strong>{'Thank you for donating with Everydayhero. You\'re awesome!'}</strong>
          </p>

          <p>
            {'If you have a second, we\'d value your feedback'}
          </p>
        </section>

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
