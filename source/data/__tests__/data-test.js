import assert from 'power-assert'
import { stub } from 'sinon'
import 'sinon-as-promised'
import jeffrey from 'jeffrey'

import { sendNPS } from '../'

describe('data sending module', () => {
  beforeEach(() => {
    stub(jeffrey, 'init')
    stub(jeffrey, 'trackAction')
  })

  afterEach(() => {
    jeffrey.init.restore()
    jeffrey.trackAction.restore()
  })

  it('should call jeffrey.init with tracking token', () => {
    sendNPS(3, 'Your website sucks', 'test-token')

    assert(jeffrey.init.calledWith('test-token'))
  })

  it('should return a Promise', () => {
    const promise = sendNPS(3, 'Your website sucks', 'test-token')

    assert(promise instanceof Promise)
  })

  it('should call jeffrey.trackAction with a properly formatted event', () => {
    sendNPS(3, 'Your website sucks', 'test-token')

    assert(jeffrey.trackAction.called)
    assert(jeffrey.trackAction.calledWith(
      'supporter.nps.send-feedback',
      {
        score: 3,
        feedback: 'Your website sucks'
      }
    ))
  })

  // Note: Mixpanel's dumb library never returns any errors even if it completely
  // fails to capture events, so there's no reject state.
  it('should resolve the promise when trackAction callback fires', () => {
    jeffrey.trackAction.yieldsAsync()

    return sendNPS(5, 'Fun, but dumb', 'test-token').then(() => {
      assert(true, 'sendNPS Promise resolved successfully')
    })
  })
})
