/**
 * Convert Fraction String to Decimal
 * Source https://stackoverflow.com/a/49246271
 * @param {String} fraction
 * @returns {Number}
 */
export default function fractionToDecimal(fraction) {
  return fraction
    .split('/')
    .reduce((numerator, denominator, i) => numerator / (i ? denominator : 1));
}
