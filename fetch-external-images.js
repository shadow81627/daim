const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const lodash = require('lodash');
const getFiles = require('./utils/get-files');
const normalizeData = require('./utils/normalize-data');

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex({ r, g, b }) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function renameKeys(content) {
  return normalizeData({
    obj: content,
    keysMap: { href: 'url', heading: 'name' },
  });
}

const downloadImage = (url, imagePath) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e));
      }),
  );

function checkFileExists(file) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

async function resize({ input, output }) {
  try {
    const buffer = await sharp(input)
      .toFormat('png')
      .resize({
        width: 4686,
        height: 2636,
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        trim: true,
        enlarge: true,
      })
      .toBuffer();
    await sharp(buffer).toFile(output ?? input);
  } catch (e) {
    console.error(e);
  }
}

async function updateContent({
  folder,
  imageFolder,
  imageKey = 'image',
  rename = true,
}) {
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const data = fs.readFileSync(filename);
    const content = JSON.parse(data);
    let imageUrl = lodash.get(content, imageKey) ?? '';
    imageUrl = imageUrl.replace(/^\/\//, 'https://');
    imageUrl = imageUrl.replace(/^https:\/\/daim.dev\//, '');
    const slug = path.parse(filename).name;
    const imagePath = `${imageFolder}${slug}.png`;
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
              await resize({ input: `static/${imageUrl}`, output: imagePath });
            }
            const { dominant } = await sharp(imagePath).stats();
            offer.color = rgbToHex(dominant);
          }
        }
      }
    }
    const fileExists = await checkFileExists(imagePath);
    if (imageUrl && !fileExists) {
      if (imageUrl.startsWith('http')) {
        await downloadImage(imageUrl, imagePath);
        await resize({ input: imagePath, output: imagePath });
      } else {
        const input = `static/${imageUrl}`.replace('//', '/');
        await resize({ input, output: imagePath });
      }
      const { dominant } = await sharp(imagePath).stats();
      content.color = rgbToHex(dominant);
    }
    if (rename) {
      const renamed = renameKeys(content);
      const stringContent = JSON.stringify(renamed, null, 2) + '\n';
      fs.writeFileSync(filename, stringContent);
    }
  }
}

(async () => {
  const contents = [
    {
      slug: 'tools',
      folder: 'content/tools/',
      imageFolder: 'static/img/tools/',
    },
    {
      slug: 'alternatives',
      folder: 'content/alternatives/',
      imageFolder: 'static/img/alternatives/',
    },
    {
      slug: 'team',
      folder: 'content/team/',
      imageFolder: 'static/img/team/',
      imageKey: 'basics.picture',
      rename: false,
    },
    {
      slug: 'services',
      folder: 'content/services/',
      imageFolder: 'static/img/services/',
    },
    {
      slug: 'portfolio',
      folder: 'content/projects/',
      imageFolder: 'static/img/portfolio/',
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
  ];
  // get list of urls to crawl from content files
  for await (const image of images) {
    const slug = path.parse(image).name;
    console.log(slug);
    const imagePath = `static/img/blog/${slug}.png`;
    const fileExists = await checkFileExists(imagePath);
    if (!fileExists) {
      if (image.startsWith('http')) {
        await downloadImage(image, imagePath);
        await resize({ input: imagePath, output: imagePath });
      } else {
        await resize({ input: `static/${image}`, output: imagePath });
      }
    }
    // const { dominant } = await sharp(imagePath).stats();
    // const hex = rgbToHex(dominant);
    // console.log(slug, hex);
  }
})();
