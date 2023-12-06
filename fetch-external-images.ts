import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import lodash from 'lodash';
import { getStamps } from 'git-date-extractor';
import getFiles from './utils/get-files';
import normalizeData from './utils/normalize-data';

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

type RGBToHexOptions = { r: number; g: number; b: number };
function rgbToHex({ r, g, b }: RGBToHexOptions) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function renameKeys(content: Record<string, unknown>) {
  return normalizeData({
    obj: content,
    keysMap: { href: 'url', heading: 'name', subtitle: 'subheading' },
  });
}

const downloadImage = (url: string, imagePath: string) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on('finish', () => resolve(imagePath))
          .on('error', (e: Error) => reject(e));
      }),
  );

function checkFileExists(file: string) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
type ResizeOptions = { input: string; output: string };
async function resize({ input, output }: ResizeOptions) {
  try {
    const buffer = await sharp(input)
      .toFormat('png')
      .resize({
        width: 4686,
        height: 2636,

        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toBuffer();
    await sharp(buffer).toFile(output ?? input);
  } catch (e) {
    console.error(e);
  }
}
type UpdateContentOptions = {
  folder: string;
  imageFolder: string;
  imageKey?: string;
  rename?: boolean;
};
async function updateContent({
  folder,
  imageFolder,
  imageKey = 'image',
  rename = true,
}: UpdateContentOptions) {
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const data = fs.readFileSync(filename);
    const content = JSON.parse(data.toString());
    const slug = path.parse(filename).name;

    console.log(slug);
    if (content.offers) {
      for (const categoryKey in content.offers) {
        const category = content.offers[categoryKey];
        console.log('    - ', categoryKey);
        for (const offerKey in category) {
          const offer = category[offerKey];
          console.log('        - ', offerKey);
          const imageUrl = offer.image;
          const offerFolder = `${imageFolder}/offers/${slug}/`.replace(
            /\/\//,
            '/',
          );
          const imagePath = `${offerFolder}${offerKey}.png`;
          const folderExists = await checkFileExists(offerFolder);
          if (!folderExists) {
            fs.mkdirSync(offerFolder);
          }
          const fileExists = await checkFileExists(imagePath);
          if (imageUrl && !fileExists) {
            if (imageUrl.startsWith('http')) {
              await downloadImage(imageUrl, imagePath);
            } else {
              await resize({ input: `public/${imageUrl}`, output: imagePath });
            }
            const { dominant } = await sharp(imagePath).stats();
            offer.color = rgbToHex(dominant);
          }
        }
      }
    }
    const imageUrl = (lodash.get(content, imageKey) ?? '')
      .replace(/^\/\//, 'https://')
      .replace(/^https:\/\/daim.dev\//, '');
    const bannerUrl = lodash.get(content, 'banner') ?? '';
    const imagePath = `${imageFolder}${slug}.png`;
    const bannerPath = `${imageFolder}/banners/${slug}.png`;
    const images = [
      { imageUrl, imagePath, type: 'main' },
      { imageUrl: bannerUrl, imagePath: bannerPath, type: 'banner' },
    ];
    for (const image of images) {
      const fileExists = await checkFileExists(image.imagePath);
      if (image.imageUrl && !fileExists) {
        if (image.imageUrl.startsWith('http')) {
          await downloadImage(image.imageUrl, image.imagePath);
          await resize({ input: image.imagePath, output: image.imagePath });
        } else {
          const input = `public/${image.imageUrl}`.replace('//', '/');
          await resize({ input, output: image.imagePath });
        }
        if (image.type === 'main' && !content.color) {
          const { dominant } = await sharp(image.imagePath).stats();
          content.color = rgbToHex(dominant);
        }
      }
    }

    const timestamps = JSON.parse(
      (await readFile('timestamps.json')).toString(),
    );
    const contentFilePath = `${folder}${slug}.json`;

    // Remove last full stop from subheading
    content.subheading = content.subheading?.replace(/\.$/, '');
    content.createdAt = timestamps[contentFilePath].created;
    // content.updatedAt = timestamps[contentFilePath].modified;
    content.updatedAt = undefined;

    if (rename) {
      const renamed = renameKeys(content);
      const stringContent = JSON.stringify(renamed, null, 2) + '\n';
      fs.writeFileSync(filename, stringContent);
    }
  }
}

(async () => {
  await getStamps({ onlyIn: 'content', outputToFile: true });
  const contents = [
    {
      slug: 'tools',
      folder: 'content/tools/',
      imageFolder: 'public/img/tools/',
    },
    {
      slug: 'alternatives',
      folder: 'content/alternatives/',
      imageFolder: 'public/img/alternatives/',
    },
    {
      slug: 'team',
      folder: 'content/team/',
      imageFolder: 'public/img/team/',
      imageKey: 'basics.picture',
      rename: false,
    },
    {
      slug: 'services',
      folder: 'content/services/',
      imageFolder: 'public/img/services/',
    },
    {
      slug: 'portfolio',
      folder: 'content/projects/',
      imageFolder: 'public/img/portfolio/',
    },
  ];
  for (const content of contents) {
    console.log(content.slug);
    await updateContent(content);
  }

  const images = [
    'img/blog/best-front-end-framework.jpg',
    'img/blog/docker.jpg',
    'img/blog/git-workflow.png',
    'img/blog/nuxt.png',
    'img/blog/paperplane.jpg',
    'img/blog/windows.jpg',
    'img/blog.jpg',
    'img/portfolio/scuber.jpg',
    'https://begriffs.com/images/reorder-list.png',
    'https://wearepixel.com.au/static/93dc2daa73fab468fc19e7d053047220/47498/selecting_a_digital_agency.jpg',
    'https://tailwind.build/tailwind/static/img/components.png?v=1',
    'https://harlanzw.com/__og_image__/og.png',
  ];
  // get list of urls to crawl from content files
  for await (const image of images) {
    const slug = path.parse(image).name;
    console.log(slug);
    const imagePath = `public/img/blog/${slug}.png`;
    const fileExists = await checkFileExists(imagePath);
    if (!fileExists) {
      if (image.startsWith('http')) {
        await downloadImage(image, imagePath);
        await resize({ input: imagePath, output: imagePath });
      } else {
        await resize({ input: `public/${image}`, output: imagePath });
      }
    }
    // const { dominant } = await sharp(imagePath).stats();
    // const hex = rgbToHex(dominant);
    // console.log(slug, hex);
  }
})();
