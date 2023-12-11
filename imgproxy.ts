import { Buffer } from 'buffer';
import { encodeURI } from 'js-base64';
import { joinURL, withBase } from 'ufo';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Base64url from 'crypto-js/enc-base64url.js';
import hex from 'crypto-js/enc-hex.js';
import { ProviderGetImage } from '@nuxt/image';
import { createOperationsGenerator } from '@nuxt/image/dist/runtime/utils';

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const sign = (salt: string, target: string, secret: string) => {
  const msg = hexDecode(salt + Buffer.from(target).toString('hex')); // Uint8Array of arbitrary length
  if (!msg.toString('hex')) return;
  const hmac = hmacSHA256(hex.parse(msg.toString('hex')), hex.parse(secret));
  const digest = hmac.toString(Base64url);
  return digest;
};

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    resize: 'rs',
    size: 's',
    fit: 'rt',
    width: 'w',
    height: 'h',
    dpr: 'dpr',
    enlarge: 'el',
    extend: 'ex',
    gravity: 'g',
    crop: 'c',
    padding: 'pd',
    trim: 't',
    rotate: 'rot',
    quality: 'q',
    maxBytes: 'mb',
    background: 'bg',
    backgroundAlpha: 'bga',
    blur: 'bl',
    sharpen: 'sh',
    watermark: 'wm',
    preset: 'pr',
    cacheBuster: 'cb',
    stripMetadata: 'sm',
    stripColorProfile: 'scp',
    autoRotate: 'ar',
    filename: 'fn',
    format: 'f',
  },
  valueMap: {
    // imgproxy values
    // fit resizes the image while keeping aspect ratio to fit a given size.
    // fill: resizes the image while keeping aspect ratio to fill a given size and crops projecting parts.
    // fill-down: the same as fill, but if the resized image is smaller than the requested size, imgproxy will crop the result to keep the requested aspect ratio.
    // force: resizes the image without keeping the aspect ratio.
    fit: {
      // (default) Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit
      cover: 'fill',
      // Preserving aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.
      contain: 'fit',
      // Ignore the aspect ratio of the input and stretch to both provided dimensions.
      fill: 'force',
      // Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
      inside: 'fill-down',
      // Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
      outside: 'fill-down',
    },
  },
  formatter: (key: string, value: string) => `${key}:${value}`,
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL, key, salt, cdnURL } = {},
) => {
  const encodedUrl = encodeURI(withBase(src, baseURL));
  const path = joinURL('/', operationsGenerator(modifiers), encodedUrl);
  const signature = sign(salt, path, key);

  return {
    url: withBase(joinURL(signature, path), cdnURL),
  };
};
