/**
 * This file uses code from `ms` by Vercel, Inc.,
 * licensed under the MIT License. See https://github.com/vercel/ms
 *
 * The file has been modified by Shun Ueda <me@shu.nu>.
 */
import { doesNotThrow } from 'node:assert'
import { equal } from 'node:assert'
import { describe } from 'node:test'
import { test } from 'node:test'
import { ms } from '../../src/lib/ms'

describe(import.meta.filename, () => {
  describe('short', () => {
    test('should not throw an error', () => {
      doesNotThrow(() => {
        ms('1m')
      })
    })

    test('should preserve ms', () => {
      equal(ms('100'), 100)
    })

    test('should convert from m to ms', () => {
      equal(ms('1m'), 60000)
    })

    test('should convert from h to ms', () => {
      equal(ms('1h'), 3600000)
    })

    test('should convert d to ms', () => {
      equal(ms('2d'), 172800000)
    })

    test('should convert w to ms', () => {
      equal(ms('3w'), 1814400000)
    })

    test('should convert s to ms', () => {
      equal(ms('1s'), 1000)
    })

    test('should convert ms to ms', () => {
      equal(ms('100ms'), 100)
    })

    test('should convert y to ms', () => {
      equal(ms('1y'), 31557600000)
    })

    test('should work with decimals', () => {
      equal(ms('1.5h'), 5400000)
    })

    test('should work with multiple spaces', () => {
      equal(ms('1   s'), 1000)
    })

    test('should return NaN if invalid', () => {
      equal(Number.isNaN(ms('☃')), true)
      equal(Number.isNaN(ms('10-.5')), true)
      equal(Number.isNaN(ms('ms')), true)
    })

    test('should be case-insensitive', () => {
      equal(ms('1.5H'), 5400000)
    })

    test('should work with numbers starting with .', () => {
      equal(ms('.5ms'), 0.5)
    })

    test('should work with negative integers', () => {
      equal(ms('-100ms'), -100)
    })

    test('should work with negative decimals', () => {
      equal(ms('-1.5h'), -5400000)
      equal(ms('-10.5h'), -37800000)
    })

    test('should work with negative decimals starting with "."', () => {
      equal(ms('-.5h'), -1800000)
    })
  })

  describe('long', () => {
    test('should not throw an error', () => {
      doesNotThrow(() => {
        ms('53 milliseconds')
      })
    })

    test('should convert milliseconds to ms', () => {
      equal(ms('53 milliseconds'), 53)
    })

    test('should convert msecs to ms', () => {
      equal(ms('17 msecs'), 17)
    })

    test('should convert sec to ms', () => {
      equal(ms('1 sec'), 1000)
    })

    test('should convert from min to ms', () => {
      equal(ms('1 min'), 60000)
    })

    test('should convert from hr to ms', () => {
      equal(ms('1 hr'), 3600000)
    })

    test('should convert days to ms', () => {
      equal(ms('2 days'), 172800000)
    })

    test('should convert weeks to ms', () => {
      equal(ms('1 week'), 604800000)
    })

    test('should convert years to ms', () => {
      equal(ms('1 year'), 31557600000)
    })

    test('should work with decimals', () => {
      equal(ms('1.5 hours'), 5400000)
    })

    test('should work with negative integers', () => {
      equal(ms('-100 milliseconds'), -100)
    })

    test('should work with negative decimals', () => {
      equal(ms('-1.5 hours'), -5400000)
    })

    test('should work with negative decimals starting with "."', () => {
      equal(ms('-.5 hr'), -1800000)
    })
  })
})
