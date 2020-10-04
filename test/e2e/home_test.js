/* eslint-disable no-undef */

const name = 'home';

Feature(name);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/`);
  I.see('DAMIEN ROBINSON', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
