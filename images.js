const sharp = require('sharp');

const file = 'assets/img/header-bg.jpg';
sharp(file)
  .resize(4686)
  .toFile(`assets/img/header-bg-1.jpg`, (err, info) => {
    console.log(err, info);
  });
