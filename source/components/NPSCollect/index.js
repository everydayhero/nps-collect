import React from 'react'

import { sendNPS } from '../../data'
import RatingButtonGroup from '../RatingButtonGroup'
import FeedbackSection from '../FeedbackSection'
import LoadingIndicator from '../LoadingIndicator'

class NPSCollect extends React.Component {
  constructor () {
    super()

    this.state = { sending: false, submitted: false }

    this.submitFeedback = this.submitFeedback.bind(this)
    this.handleFeedbackChanged = this.handleFeedbackChanged.bind(this)
    this.handleScoreSelected = this.handleScoreSelected.bind(this)
  }

  submitFeedback () {
    const { score, feedback } = this.state
    const { trackingToken } = this.props

    this.setState({ sending: true })

    return sendNPS(score, feedback, trackingToken).then(() => {
      this.setState({ submitted: true, sending: false })
    })
  }

  handleScoreSelected (score) {
    this.setState({ score })

    if (score < 9) {
      return this.setState({ showFeedbackInput: true })
    } else {
      this.setState({ showFeedbackInput: false })
      this.submitFeedback()
    }
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

          <RatingButtonGroup handleScoreSelected={this.handleScoreSelected} />

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
  trackingToken: React.PropTypes.string.isRequired
}

export default NPSCollect
