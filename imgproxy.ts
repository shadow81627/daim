import { Buffer } from 'buffer';
import { encodeURI } from 'js-base64';
import { joinURL, withBase } from 'ufo';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Base64url from 'crypto-js/enc-base64url.js';
import hex from 'crypto-js/enc-hex.js';
import {
  OperationGeneratorConfig,
  OperationMapper,
  ProviderGetImage,
} from '@nuxt/image-edge';

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

function createMapper(map: Record<string, string>): OperationMapper {
  return (key?: string) => {
    return key ? map[key] ?? key : map.missingValue;
  };
}

function createOperationsGenerator({
  formatter,
  keyMap,
  joinWith = '/',
  valueMap,
}: OperationGeneratorConfig = {}) {
  if (!formatter) {
    formatter = (key, value: string) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== 'function') {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap ?? {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== 'function') {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });

  return (modifiers: { [key: string]: string } = {}) => {
    const operations = Object.entries(modifiers)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        const mapper = map[key];
        if (typeof mapper === 'function') {
          value = mapper(modifiers[key]);
        }

        key = typeof keyMap === 'function' ? keyMap(key) : key;

        return formatter?.(key, value);
      });

    return operations.join(joinWith);
  };
}

const sign = (salt: string, target: string, secret: string) => {
  const msg = hexDecode(salt + Buffer.from(target).toString('hex')); // Uint8Array of arbitrary length
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
    // fit resizes the image while keeping aspect ratio to fit a given size.
    // fill: resizes the image while keeping aspect ratio to fill a given size and crops projecting parts.
    // fill-down: the same as fill, but if the resized image is smaller than the requested size, imgproxy will crop the result to keep the requested aspect ratio.
    // force: resizes the image without keeping the aspect ratio.
    fit: {
      // (default) Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit
      cover: 'fit',
      // Preserving aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.
      contain: 'fill',
      // Ignore the aspect ratio of the input and stretch to both provided dimensions.
      fill: 'force',
      // Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
      inside: 'fill-down',
      // Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
      outside: 'fill-down',
    },
  },
  formatter: (key, value) => `${key}:${value}`,
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = 'https://imgproxy.daim.dev', key, salt } = {},
) => {
  const config = useRuntimeConfig();
  const encodedUrl = encodeURI(withBase(src, config.BASE_URL));
  const path = joinURL('/', operationsGenerator(modifiers), encodedUrl);
  const signature = sign(salt, path, key);

  return {
    url: withBase(joinURL(signature, path), baseURL),
  };
};
