const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
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

async function updateContent({ folder, imageFolder }) {
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const data = fs.readFileSync(filename);
    const content = JSON.parse(data);
    const imageUrl = content.image;
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
          const imagePath = `${imageFolder}/offers/${slug}/${offerKey}.png`;
          if (imageUrl) {
            if (imageUrl.startsWith('http')) {
              const fileExists = await checkFileExists(imagePath);
              if (!fileExists) {
                await downloadImage(imageUrl, imagePath);
              }
            } else {
              await resize({ input: `static/${imageUrl}`, output: imagePath });
            }
            const { dominant } = await sharp(imagePath).stats();
            offer.color = rgbToHex(dominant);
          }
        }
      }
    }
    if (imageUrl) {
      if (imageUrl.startsWith('http')) {
        const fileExists = await checkFileExists(imagePath);
        if (!fileExists) {
          await downloadImage(imageUrl, imagePath);
        }
        await resize({ input: imagePath, output: imagePath });
      } else {
        await resize({ input: `static/${imageUrl}`, output: imagePath });
      }
      const { dominant } = await sharp(imagePath).stats();
      content.color = rgbToHex(dominant);
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
  ];
  for (const content of contents) {
    console.log(content.slug);
    await updateContent(content);
  }

  const images = [
    'static/img/blog/best-front-end-framework.jpg',
    'static/img/blog/docker.jpg',
    'static/img/blog/git-workflow.png',
    'static/img/blog/nuxt.png',
    'static/img/blog/paperplane.jpg',
    'static/img/blog/windows.jpg',
    'static/img/blog.jpg',
    'static/img/portfolio/scuber.jpg',
  ];
  // get list of urls to crawl from content files
  for await (const filename of images) {
    const { dominant } = await sharp(filename).stats();
    const hex = rgbToHex(dominant);
    const slug = path.parse(filename).name;
    console.log(slug, hex);
  }
})();
