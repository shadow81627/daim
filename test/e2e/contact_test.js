/* eslint-disable no-undef */

const slug = 'contact';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug}`);
  I.see('CONTACT', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
