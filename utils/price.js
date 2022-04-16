export default function price(cost = 0, currency = 'USD') {
  const margin = cost * 2;
  const nines = margin === 0 || margin % 1 !== 0 ? margin : margin - 0.01;
  const price = nines;
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency,
  });
}
