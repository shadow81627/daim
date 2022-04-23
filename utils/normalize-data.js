const lodash = require('lodash');
const sortObject = require('./sort-object');

/**
 * Normalize content for string diff
 * Remove keys that the user doesn't change
 *
 * @param {Object} data
 * @returns {Object}
 */
function normalizeData({ obj, keysMap = {} }) {
  const result = sortObject(JSON.parse(JSON.stringify(obj)));
  for (const i in result) {
    if (!Object.prototype.hasOwnProperty.call(result, i)) continue;
    if (keysMap[i]) {
      result[keysMap[i]] = result[i];
      delete result[i];
    } else if (lodash.isObject(result[i])) {
      result[i] = normalizeData({
        obj: result[i],
        keysMap,
      });
    }
  }
  return result;
}

module.exports = normalizeData;
