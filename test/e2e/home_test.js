/* eslint-disable no-undef */

const slug = 'home';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/`);
  I.see('DAMIEN ROBINSON', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
