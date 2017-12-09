'use strict'

const assert = require('assert')
const enforceRange = require('.')

describe('enforceRange()', function () {
  it('should return min if number is less than min', function () {
    assert.strictEqual(enforceRange(-10, 10, -11), -10)
  })

  it('should return max if number is greater than max', function () {
    assert.strictEqual(enforceRange(-10, 10, 11), 10)
  })

  it('should return number if number is within range', function () {
    assert.strictEqual(enforceRange(-10, 10, 5), 5)
  })

  it('should support floats', function () {
    assert.strictEqual(enforceRange(-1.1, 1.1, 1.2), 1.1)
  })

  it('should support string numbers', function () {
    assert.strictEqual(enforceRange('5', '6', '7'), 6)
  })

  it('should support currying', function () {
    assert.strictEqual(enforceRange(-10, 10)(11), 10)
  })

  it('should support a range with equal min and max', function () {
    assert.strictEqual(enforceRange(99, 99, 50), 99)
  })

  it('should support a range with null max', function () {
    assert.strictEqual(enforceRange(0, null, 100), 100)
  })

  it('should support a range with Infinity max', function () {
    assert.strictEqual(enforceRange(0, Infinity, 100), 100)
  })

  it('should support a range with null min', function () {
    assert.strictEqual(enforceRange(null, 0, -100), -100)
  })

  it('should support a range with -Infinity min', function () {
    assert.strictEqual(enforceRange(-Infinity, 0, -100), -100)
  })

  it('should return number if no min or max is specified', function () {
    assert.strictEqual(enforceRange(null, null, 123), 123)
    assert.strictEqual(enforceRange(-Infinity, Infinity, 123), 123)
  })

  it('should throw a TypeError if min is not null or a number', function () {
    assert.throws(() => { enforceRange('not a number', 10, 0) }, TypeError)
  })

  it('should throw a TypeError if min is NaN', function () {
    assert.throws(() => { enforceRange(NaN, 10, 0) }, TypeError)
  })

  it('should throw a TypeError if max is not null or a number', function () {
    assert.throws(() => { enforceRange(-10, 'not a number', 0) }, TypeError)
  })

  it('should throw a TypeError if max is NaN', function () {
    assert.throws(() => { enforceRange(-10, NaN, 0) }, TypeError)
  })

  it('should throw a TypeError if value is not a number', function () {
    assert.throws(() => { enforceRange(-10, 10, null) }, TypeError)
  })

  it('should throw a TypeError if value is NaN', function () {
    assert.throws(() => { enforceRange(-10, 10, NaN) }, TypeError)
  })

  it('should throw a TypeError if no arguments are provided', function () {
    assert.throws(() => { enforceRange() }, TypeError)
  })

  it('should throw a RangeError if min is greater than max', function () {
    assert.throws(() => { enforceRange(10, -10, 0) }, RangeError)
    assert.throws(() => { enforceRange(Infinity, 0, 0) }, RangeError)
  })
})
