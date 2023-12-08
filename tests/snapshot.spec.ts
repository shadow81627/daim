import { test, expect } from '@playwright/test';

const pages = [
  { slug: 'home', route: '/' },
  { slug: 'blog', heading: 'Articles' },
  { slug: 'contact', heading: 'Contact' },
  { slug: 'tools', heading: 'Tools' },
  { slug: 'portfolio', heading: 'Portfolio' },
  { slug: 'people', heading: 'Team' },
  { slug: 'alternatives', heading: 'Alternatives' },
  { slug: 'services', heading: 'Services' },
  // { slug: 'about', heading: 'ABOUT' },
  // { slug: '404', heading: '404' },
  // { slug: 'search', heading: 'SEARCH' },
  // { slug: 'privacy', heading: 'PRIVACY' },
  // { slug: 'terms', heading: 'TERMS' },
  { slug: 'sitemap', route: '/sitemap.xml' },
  { slug: 'robots', route: '/robots.txt' },
];

for (const { slug, heading, route } of pages) {
  test(slug, async ({ page }) => {
    await page.goto(route || `/${slug}`);

    if (heading) {
      await expect(
        page.getByRole('heading', { name: heading, exact: true }),
      ).toBeVisible();
    }

    await expect(page).toHaveScreenshot();
  });
}
