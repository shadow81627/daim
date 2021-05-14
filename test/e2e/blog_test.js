/* eslint-disable no-undef */

const slug = 'blog';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug}`);
  I.see("DAMIEN ROBINSON'S BLOG", 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
