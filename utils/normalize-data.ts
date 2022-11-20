import isObject from 'lodash/isObject';
import sortObject from './sort-object';

type NormalizeDataOptions = {
  obj: Record<string, unknown>;
  keysMap: Record<string, string>;
};
/**
 * Normalize content for string diff
 * Remove keys that the user doesn't change
 *
 * @param {Object} data
 * @returns {Object}
 */
function normalizeData({ obj, keysMap = {} }: NormalizeDataOptions) {
  const result = sortObject(JSON.parse(JSON.stringify(obj))) as Record<
    string,
    unknown
  >;
  for (const i in result) {
    if (!Object.prototype.hasOwnProperty.call(result, i)) continue;
    if (keysMap[i]) {
      result[keysMap[i]] = result[i];
      delete result[i];
    } else if (isObject(result[i])) {
      result[i] = normalizeData({
        obj: result[i] as Record<string, unknown>,
        keysMap,
      });
    }
  }
  return result;
}

export default normalizeData;
