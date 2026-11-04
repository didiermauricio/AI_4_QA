import { expect, type Locator, type Page } from '@playwright/test';

export class SportHubPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly publicationRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Buscar periódico...');
    this.publicationRows = page.locator('tbody tr');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'SportHub News' })).toBeVisible();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async getPublicationNames(): Promise<string[]> {
    return this.page.locator('.publication-name').allTextContents();
  }

  async getPublicationRow(name: string): Promise<Locator> {
    return this.page.locator('tbody tr').filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  async deletePublication(name: string) {
    const row = await this.getPublicationRow(name);
    await this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await row.getByRole('button', { name: `Eliminar ${name}` }).click();
  }

  async cancelDeletion(name: string) {
    const row = await this.getPublicationRow(name);
    await this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
    await row.getByRole('button', { name: `Eliminar ${name}` }).click();
  }

  async expectPublicationVisible(name: string) {
    await expect(this.page.getByRole('cell', { name, exact: true })).toBeVisible();
  }

  async expectPublicationHidden(name: string) {
    await expect(this.page.getByRole('cell', { name, exact: true })).toHaveCount(0);
  }
}
