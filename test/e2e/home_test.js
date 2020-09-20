/* eslint-disable no-undef */

Feature('Home');

Scenario('Heading 1', async (I) => {
  I.amOnPage('/');
  I.see('DAMIEN ROBINSON', 'h1');

  I.saveScreenshot('home.png');
  await I.seeVisualDiff('home.png');
});
