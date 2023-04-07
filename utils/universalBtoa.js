/**
 * btoa only in browser this function is called in ssr node
 * for the campaign email static generation.
 *
 * Source: https://stackoverflow.com/a/61454823
 * */
export default function universalBtoa(str) {
  try {
    return window.btoa(str);
  } catch (err) {
    return Buffer.from(str).toString('base64');
  }
}
