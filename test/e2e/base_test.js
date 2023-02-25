const pages = [
  { slug: 'home', route: '/' },
  { slug: 'blog', heading: 'BLOG' },
  { slug: 'contact', heading: 'CONTACT' },
  { slug: 'tools', heading: 'TOOLS' },
  { slug: 'portfolio', heading: 'PORTFOLIO' },
  { slug: 'people', heading: 'TEAM' },
  { slug: 'alternatives', heading: 'ALTERNATIVES' },
  { slug: 'services', heading: 'SERVICES' },
  // { slug: 'about', heading: 'ABOUT' },
  // { slug: '404', heading: '404' },
  // { slug: 'search', heading: 'SEARCH' },
  // { slug: 'privacy', heading: 'PRIVACY' },
  // { slug: 'terms', heading: 'TERMS' },
  { slug: 'sitemap', route: '/sitemap.xml' },
  { slug: 'robots', route: '/robots.txt' },
];

Feature('layout');

for (const { slug, heading, route } of pages) {
  Scenario(slug, async ({ I }) => {
    I.amOnPage(route || `/${slug}`);

    if (heading) {
      I.see(heading.toUpperCase(), 'h1');
    }

    I.wait(5);
    // I.saveScreenshot(`${slug}.png`);
    await I.seeVisualDiff(`${slug}.png`);
  });
}
