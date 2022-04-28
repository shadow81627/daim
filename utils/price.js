export default function price(args) {
  const { cost, currency, margin } = {
    cost: 0,
    currency: 'USD',
    margin: 0.5,
    ...args,
  };
  const price = cost / (margin || 1);
  const nines =
    price === 0 || price % 1 !== 0 || margin === 0 ? price : price - 0.01;
  const minimumFractionDigits = nines % 1 !== 0 ? 0 : 2;
  const maximumSignificantDigits = 3;
  return nines.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumSignificantDigits,
  });
}
