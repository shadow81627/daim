const lodash = require('lodash');

/**
 * Sort object by keys
 * @param {Object} object
 * @returns {Object}
 */
function sortObject(object) {
  if (lodash.isObject(object) && !Array.isArray(object)) {
    return Object.keys(object)
      .sort()
      .reduce(function (result, key) {
        result[key] = object[key];
        return result;
      }, {});
  }
  return object;
}

module.exports = sortObject;
