import jeffrey from 'jeffrey'

if (!process.env.JEFFREY_TOKEN) {
  console.warn('No Jeffrey tracking token configured, this form goes nowhere.')
}

const sendNPS = (action, params) => {
  jeffrey.init(process.env.JEFFREY_TOKEN)

  return new Promise((resolve) => {
    jeffrey.trackAction(
      action,
      params,
      resolve
    )
  })
}

export const sendNPSScore = (pageId, userId, score) => {
  return sendNPS('supporter.nps.send-score', { pageId, userId, score })
}

export const sendNPSFeedback = (pageId, userId, feedback) => {
  return sendNPS('supporter.nps.send-feedback', { pageId, userId, feedback })
}
