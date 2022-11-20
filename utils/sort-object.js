import isObject from 'lodash/isObject';

/**
 * Sort object by keys
 * @param {Object} object
 * @returns {Object}
 */
function sortObject(object) {
  if (isObject(object) && !Array.isArray(object)) {
    return Object.keys(object)
      .sort()
      .reduce(function (result, key) {
        result[key] = object[key];
        return result;
      }, {});
  }
  return object;
}

export default sortObject;
