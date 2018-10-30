'use strict'

module.exports = function (fn) {
  return function (options) {
    if (options === undefined) options = {}
    if (typeof options !== 'object') throw new Error('The arguments is must be an object.')

    return new Promise((resolve, reject) => {
      options.success = resolve
      options.fail = function (res) {
        if (res && res.errMsg) {
          reject(new Error(res.errMsg))
        } else {
          reject(res)
        }
      }

      fn(options)
    })
  }
}
