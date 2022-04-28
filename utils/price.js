export default function price(args) {
  const { cost, currency, margin } = {
    cost: 0,
    currency: 'USD',
    margin: 0.5,
    ...args,
  };
  const price = cost / (margin || 1);
  const nines =
    price === 0 || !Number.isInteger(price) || margin === 0
      ? price
      : price - 0.01;
  const minimumFractionDigits = Number.isInteger(nines) ? 0 : 2;
  const formatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits,
  };
  const formatted = new Intl.NumberFormat('en-US', formatOptions).format(nines);
  return formatted;
}
