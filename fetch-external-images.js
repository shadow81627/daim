const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const getFiles = require('./utils/get-files');

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex({ r, g, b }) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
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

async function downloadResize(imageUrl, imagePath) {
  await downloadImage(imageUrl, imagePath);
  try {
    const buffer = await sharp(imagePath)
      .resize({
        width: 4686,
        height: 2636,
      })
      .toBuffer();
    await sharp(buffer).toFile(imagePath);
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  const folder = 'content/tools/';
  const imageFolder = 'static/img/tools/';
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const data = fs.readFileSync(filename);
    const content = JSON.parse(data);
    console.log(content.image);
    const imageUrl = content.image;
    const slug = path.parse(filename).name;
    const imagePath = `${imageFolder}${slug}.png`;
    if (content.offers) {
      for (const categoryKey in content.offers) {
        const category = content.offers[categoryKey];
        console.log('    - ', categoryKey);
        for (const offerKey in category) {
          const offer = category[offerKey];
          console.log('        - ', offerKey);
          const imageUrl = offer.image;
          const imagePath = `${imageFolder}/offers/${slug}/${offerKey}.png`;
          if (imageUrl && imageUrl.startsWith('http')) {
            await downloadResize(imageUrl, imagePath);
            const { dominant } = await sharp(imagePath).stats();
            offer.color = rgbToHex(dominant);
          }
        }
      }
    }
    if (imageUrl && imageUrl.startsWith('http')) {
      await downloadResize(imageUrl, imagePath);
      const { dominant } = await sharp(imagePath).stats();
      content.color = rgbToHex(dominant);
      const stringContent = JSON.stringify(content, null, 2) + '\n';
      fs.writeFileSync(filename, stringContent);
    }
  }
})();
