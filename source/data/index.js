import jeffrey from 'jeffrey'

if (!process.env.JEFFREY_TOKEN) {
  console.warn('No Jeffrey tracking token configured, this form goes nowhere.')
}

const sendNPS = (event) => (payload) => {
  jeffrey.init(process.env.JEFFREY_TOKEN)

  return new Promise((resolve) => {
    jeffrey.trackAction(
      event,
      payload,
      resolve
    )
  })
}

export const sendNPSScore = sendNPS('NPS Submit Score')
export const sendNPSFeedback = sendNPS('NPS Submit Feedback')

