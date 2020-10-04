/* eslint-disable no-undef */

const name = 'tools';

Feature(name);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${name}`);
  I.see('TOOLS', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
