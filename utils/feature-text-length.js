/**
 * Sort number of characters in description and list
 * @param {*} o item to sort
 */
export default function (o) {
  const list = (o.list ?? []).join(' ') ?? '';
  const description = o.description ?? '';
  const subheading = o.subheading ?? '';
  const heading = o.heading ?? '';
  const chars = description + list + subheading + heading;
  return chars.length;
}
