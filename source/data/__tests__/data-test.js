import test from 'ava'
import { stub } from 'sinon'
import 'sinon-as-promised'
import jeffrey from 'jeffrey'

import { sendNPS } from '../'

test.beforeEach(() => {
  stub(jeffrey, 'init')
  stub(jeffrey, 'trackAction')
})

test.afterEach(() => {
  jeffrey.init.restore()
  jeffrey.trackAction.restore()
})

test.serial('calls jeffrey.init with tracking token', t => {
  sendNPS(3, 'Your website sucks', 'test-token')

  t.true(jeffrey.init.calledWith('test-token'))
})

test('returns a Promise', t => {
  const promise = sendNPS(3, 'Your website sucks', 'test-token')

  t.true(promise instanceof Promise)
})

test.serial('calls jeffrey.trackAction with a properly formatted event', t => {
  sendNPS(3, 'Your website sucks', 'test-token')

  t.true(jeffrey.trackAction.called)
  t.true(jeffrey.trackAction.calledWith(
    'supporter.nps.send-feedback',
    {
      score: 3,
      feedback: 'Your website sucks'
    }
  ))
})

// Note: Mixpanel's dumb library never returns any errors even if it completely
// fails to capture events, so there's no reject state.
test.serial('resolves the promise when trackAction callback fires', t => {
  jeffrey.trackAction.yieldsAsync()

  return sendNPS(5, 'Fun, but dumb', 'test-token').then(() => {
    t.pass()
  })
})
