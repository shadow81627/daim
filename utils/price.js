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
  return nines.toLocaleString('en-US', {
    style: 'currency',
    currency,
  });
}
