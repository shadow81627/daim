const { readdir } = require('fs').promises;
const { resolve } = require('path');
const sharp = require('sharp');

/**
 * https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 * @param {String} dir
 */
async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const file = 'assets/img/header-bg.jpg';
sharp(file)
  .resize(4686)
  .toFile(file, (err, info) => {
    console.log(err, info);
  });

sharp(file)
  .resize({ width: 1200, height: 600 })
  .toFile(`static/cover.jpg`, (err, info) => {
    console.log(err, info);
  });

(async () => {
  const folder = 'assets/img/portfolio';
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const buffer = await sharp(filename)
      .resize({ width: 4686, height: 2636 })
      .toBuffer();
    sharp(buffer).toFile(filename);
  }
})();

(async () => {
  const folder = 'assets/img/blog/';
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    const buffer = await sharp(filename)
      // .trim()
      .resize({
        width: 4686,
        height: 2636,
        // fit: 'contain',
        // background: { r: 255, g: 255, b: 255 },
      })
      .toBuffer();
    sharp(buffer).toFile(filename);
  }
})();
