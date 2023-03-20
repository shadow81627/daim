import { Buffer } from 'buffer';
import { encodeURI } from 'js-base64';
import { joinURL, withBase } from 'ufo';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Base64url from 'crypto-js/enc-base64url.js';
import hex from 'crypto-js/enc-hex.js';
import { OperationGeneratorConfig, OperationMapper } from '~/types/image';

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
  formatter: (key, value) => `${key}:${value}`,
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = 'https://imgproxy.daim.dev', key, salt } = {},
) => {
  const encodedUrl = encodeURI(src);
  const config = useRuntimeConfig();
  const path = withBase(
    joinURL('/', operationsGenerator(modifiers), encodedUrl),
    config.BASE_URL,
  );
  const signature = sign(salt, path, key);

  return {
    url: withBase(joinURL(signature, path), baseURL),
  };
};
