import { test, expect } from '@playwright/test';

// Describe the test suite for homepage flow tests
test.describe('Homepage Flow tests', () => {

  // Before each test, navigate to the homepage
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  // Test to verify the navbar elements and their navigation
  test('Homepage Navbar elements test', async ({ page }) => {
    // Click on the Navbar logo and verify the URL
    await page.getByTestId('Navbar-logo').click();
    await expect(page).toHaveURL('http://localhost:3000/en');

    // Click on the 'Docs' link and verify the URL
    await page.getByTestId('Navbar-main').getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL('http://localhost:3000/docs');

    // Click on the 'Tools' link and verify the URL
    await page.getByTestId('Navbar-main').getByRole('link', { name: 'Tools', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:3000/tools');

    // Click on the 'Community' link and verify the URL
    await page.getByRole('link', { name: 'Community' }).click();
    await expect(page).toHaveURL('http://localhost:3000/community');

    // Click on the 'Case Studies' link and verify the URL
    await page.getByRole('link', { name: 'Case Studies' }).click();
    await expect(page).toHaveURL('http://localhost:3000/casestudies');

    // Click on the 'Blog' link and verify the URL
    await page.getByTestId('Navbar-main').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('http://localhost:3000/blog');

    // Click on the 'Roadmap' link and verify the URL
    await page.getByTestId('Navbar-main').getByRole('link', { name: 'Roadmap' }).click();
    await expect(page).toHaveURL('http://localhost:3000/roadmap');

    // Click on the Navbar logo to return to the homepage and verify the URL
    await page.getByTestId('Navbar-logo').click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  // Test to verify the quick search functionality
  test('Homepage Quick Search Button test', async ({ page }) => {
    // Click on the 'Quick search...' button
    await page.getByRole('button', { name: 'Quick search...' }).click();
    
    // Click on the search box and fill it with a query
    await page.getByRole('searchbox', { name: 'Search' }).click();
    await page.getByRole('searchbox', { name: 'Search' }).fill('asyncAPI syntax');
    
    // Wait for the search results to appear
    await page.waitForSelector('#docsearch-list');
    
    // Assert that at least one search result is available
    const results = await page.locator('.DocSearch-Hit');
    const resultCount = await results.count();
    expect(resultCount).toBeGreaterThan(0);
    
    // Click the first search result
    await results.first().click();
  });

  // Test to validate the 'Want to Sponsor Us?' section
  test('Validate "Want to Sponsor Us?" section', async ({ page }) => {
    // Click on the 'Want to Sponsor Us?' heading
    await page.getByRole('heading', { name: 'Want to Sponsor Us?' }).click();
    
    // Verify the presence of supporting text
    await expect(page.getByText('These great organizations are')).toBeVisible();
  
    // Click on 'Support us!' and wait for the new page to open
    const page12Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Support us!' }).click();
    const page12 = await page12Promise;
  
    // Navigate to the sponsorship page
    await expect(page12).toHaveURL('https://opencollective.com/asyncapi');
  
    // Verify the heading 'AsyncAPI Initiative' exists
    await expect(page12.getByRole('heading', { name: 'AsyncAPI Initiative', exact: true })).toBeVisible();
    
    // Check the presence of 'Contribute', 'Budget', and 'About' sections
    await expect(page12.locator('span[aria-label="Contribute"]')).toBeVisible();
    await page12.locator('span[aria-label="Contribute"]').click();
    await expect(page12.locator('a[href="#category-CONTRIBUTE"]')).toBeVisible();
    await page12.locator('a[href="#category-CONTRIBUTE"]').click();

    // Verify the presence of specific links in the 'Contribute' section
    await expect(page12.getByRole('link', { name: 'All ways to contribute', exact: true })).toBeVisible();
    await expect(page12.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
    await expect(page12.getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
    await expect(page12.getByRole('link', { name: 'Budget', exact: true })).toBeVisible();
    await expect(page12.getByRole('button', { name: 'About' }).getByRole('link')).toBeVisible();
   


  });

  
});

