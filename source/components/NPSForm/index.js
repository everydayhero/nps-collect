import React from 'react'
import cxs from 'cxs'

import {
  container,
  ratingInput,
  ratingLabel,
  ratingLabelSelected,
  ratingInputGroup,
  npsSubmitButton,
  commentsTextarea
} from './styles'

export default class NPSForm extends React.Component {
  constructor() {
    super()

    this.state = {}

    this.handleRatingClicked = this.handleRatingClicked.bind(this)
    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.submitNPS = this.submitNPS.bind(this)
  }

  handleRatingClicked(event) {
    this.setState({ score: parseInt(event.target.value) })
  }

  handleCommentChanged(event) {
    this.setState({ comment: event.target.value })
  }

  submitNPS(event) {
    event.preventDefault()
  }

  npsInput(rating) {
    const key = `input_${rating}`
    const active = this.state.score === rating
    const labelClasses = active
      ? { ...ratingLabel, ...ratingLabelSelected }
      : { ...ratingLabel }

    return (
      <label
        key={key}
        htmlFor={key}
        className={cxs(labelClasses)}
      >
        {rating}
        <input
          type="radio"
          id={key}
          className={cxs(ratingInput)}
          name="npsValue"
          value={rating}
          onClick={this.handleRatingClicked}
        />
      </label>
    )
  }

  render() {
    return (
      <form className={cxs(container)}>
        <div className={cxs(ratingInputGroup)}>
          {scores().map(this.npsInput, this)}
        </div>

        <textarea
          id="npsComment"
          name="npsComment"
          className={cxs(commentsTextarea)}
          onChange={this.handleCommentChanged}
        />

        <button
          type="submit"
          onClick={this.submitNPS}
          className={cxs(npsSubmitButton)}
        >
          Rate Us
        </button>

      </form>
    )
  }
}

const scores = () => Array(11).fill().map((_, i) => i)
