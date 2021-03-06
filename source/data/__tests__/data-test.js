import assert from 'power-assert'
import { stub } from 'sinon'
import 'sinon-as-promised'
import jeffrey from 'jeffrey'

import { sendNPSFeedback, sendNPSScore } from '../'

describe('data sending module', () => {
  beforeEach(() => {
    process.env.JEFFREY_TOKEN = 'test-token'
    stub(jeffrey, 'init')
    stub(jeffrey, 'trackAction')
  })

  afterEach(() => {
    delete process.env.JEFFREY_TOKEN
    jeffrey.init.restore()
    jeffrey.trackAction.restore()
  })

  it('should call jeffrey.init with tracking token', () => {
    sendNPSScore({ pageId: 'test-page', userId: 'test-user', score: 3 })

    assert(jeffrey.init.calledWith('test-token'))
  })

  it('should return a Promise', () => {
    const promise = sendNPSScore('test-page', 'test-user', 3)

    assert(promise instanceof Promise)
  })

  it('should call jeffrey.trackAction with a properly formatted submit event', () => {
    sendNPSScore({ pageId: 'test-page', userId: 'test-user', score: 3 })

    assert(jeffrey.trackAction.called)
    assert(jeffrey.trackAction.calledWith(
      'NPS Submit Score',
      {
        pageId: 'test-page',
        userId: 'test-user',
        score: 3
      }
    ))
  })

  it('should call jeffrey.trackAction with a properly formatted submit feedback event', () => {
    sendNPSFeedback({ pageId: 'test-page', userId: 'test-user', score: 3, feedback: 'Love you guys!' })

    assert(jeffrey.trackAction.calledWith(
      'NPS Submit Feedback',
      {
        pageId: 'test-page',
        userId: 'test-user',
        score: 3,
        feedback: 'Love you guys!'
      }
    ))
  })

  // Note: Mixpanel's dumb library never returns any errors even if it completely
  // fails to capture events, so there's no reject state.
  it('should resolve the promise when trackAction callback fires', () => {
    jeffrey.trackAction.yieldsAsync()

    return sendNPSScore('test-page', 'test-user', 3).then(() => {
      assert(true, 'sendNPS Promise resolved successfully')
    })
  })
})
