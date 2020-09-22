/* eslint-disable no-undef */

const name = 'blog';

Feature(name);

Scenario('Heading 1', (I) => {
  I.amOnPage(`/${name}`);
  I.see("DAMIEN ROBINSON'S BLOG", 'h1');
});

Scenario('Image Diff', async (I) => {
  I.amOnPage(`/${name}`);
  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
