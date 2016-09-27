import jeffrey from 'jeffrey'

export const sendNPS = (score, feedback = '', trackingToken = '') => {
  jeffrey.init(trackingToken)

  return new Promise((resolve) => {
    jeffrey.trackAction(
      'supporter.nps.send-feedback',
      {
        score,
        feedback
      },
      resolve
    )
  })
}
