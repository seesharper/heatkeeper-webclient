import { expect, test } from '@playwright/test';

test('Locations has a list of locations', async ({ page }) => {
	await page.goto('/locations');
	await expect(page.getByRole('heading', { name: 'List of locations' })).toBeVisible();
});
