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
        {sending && <LoadingIndicator complete={submitted} />}

        <RatingButtonGroup handleScoreSelected={this.handleScoreSelected} />

        {showFeedbackInput &&
          <FeedbackSection
            handleFeedbackChanged={this.handleFeedbackChanged}
            handleFeedbackSubmitted={this.submitFeedback}
          />
        }
      </form>
    )
  }
}

NPSCollect.propTypes = {
  trackingToken: React.PropTypes.string.isRequired
}

export default NPSCollect
