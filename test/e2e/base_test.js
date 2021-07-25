const pages = [
  { slug: 'home', heading: 'DAMIEN ROBINSON', route: '/' },
  { slug: 'blog', heading: "DAMIEN ROBINSON'S BLOG" },
  { slug: 'contact' },
  { slug: 'tools' },
  { slug: 'portfolio' },
  { slug: 'people', heading: 'DAMIEN ROBINSON' },
];

// eslint-disable-next-line no-undef
Feature('layout');

for (const { slug, heading, route } of pages) {
  // eslint-disable-next-line no-undef
  Scenario(slug, async ({ I }) => {
    I.amOnPage(route || `/${slug}`);

    if (heading) {
      I.see(heading.toUpperCase(), 'h1');
    }

    I.wait(5);
    I.saveScreenshot(`${slug}.png`);
    await I.seeVisualDiff(`${slug}.png`);
  });
}
