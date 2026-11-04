import { expect, test } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { SportHubPage } from './page-objects/SportHubPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '..', 'data', 'links.json');

const originalData = [
  {
    id: 1,
    url: 'https://www.marca.com',
    name: 'Marca',
    period: 'MA',
    logoText: 'MA',
    order: 1,
  },
  {
    id: 3,
    url: 'https://www.mundodeportivo.com',
    name: 'Mundo Deportivo',
    period: 'MU',
    logoText: 'MU',
    order: 3,
  },
  {
    id: 4,
    url: 'https://www.sport.es',
    name: 'Sport',
    period: 'SP',
    logoText: 'SP',
    order: 4,
  },
  {
    id: 5,
    url: 'https://www.gazzetta.it',
    name: 'La Gazzetta dello Sport',
    period: 'LA',
    logoText: 'LA',
    order: 5,
  },
];

async function writeData(data: unknown[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

async function resetData() {
  await writeData(originalData);
}

function expectPublicationVisible(page: any, name: string) {
  return expect(page.getByRole('cell', { name, exact: true })).toBeVisible();
}

test.beforeEach(async () => {
  await resetData();
});

test.afterEach(async () => {
  await resetData();
});

test('Given the home page is loaded, when the catalog renders, then all publications are visible', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();

  await expect(app.publicationRows).toHaveCount(4);
  await expectPublicationVisible(page, 'Marca');
  await expectPublicationVisible(page, 'Mundo Deportivo');
  await expectPublicationVisible(page, 'Sport');
  await expectPublicationVisible(page, 'La Gazzetta dello Sport');
});

test('Given a publication name is entered, when the user searches, then the list is filtered to matching results', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();
  await app.search('marca');

  await expect(app.publicationRows).toHaveCount(1);
  await expectPublicationVisible(page, 'Marca');
});

test('Given the search field is empty, when the user submits the query, then the full catalog is restored', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();
  await app.search('');

  await expect(app.publicationRows).toHaveCount(4);
  await expectPublicationVisible(page, 'Marca');
  await expectPublicationVisible(page, 'Sport');
});

test('Given a publication link is displayed, when the user inspects the element, then it points to an external destination', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();

  const marcaLink = page
    .locator('tbody tr')
    .filter({ has: page.locator('.publication-name', { hasText: 'Marca' }) })
    .locator('a')
    .first();

  await expect(marcaLink).toHaveAttribute('href', 'https://www.marca.com');
  await expect(marcaLink).toHaveAttribute('target', '_blank');
});

test('Given a user confirms deletion, when they remove a publication, then the row disappears and the data is persisted', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();
  await app.deletePublication('Marca');

  await expect(page).toHaveURL(/\/\??/);
  await app.expectPublicationHidden('Marca');
  await expect(app.publicationRows).toHaveCount(3);

  const savedData = JSON.parse(await fs.readFile(dataFilePath, 'utf8'));
  expect(savedData.some((item: { name: string }) => item.name === 'Marca')).toBeFalsy();
});

test('Given the user cancels the deletion confirmation, when the dialog is dismissed, then the publication remains in the list', async ({ page }) => {
  const app = new SportHubPage(page);

  await app.goto();
  await app.cancelDeletion('Marca');

  await app.expectPublicationVisible('Marca');
  await expect(app.publicationRows).toHaveCount(4);
});

test('Given the catalog is empty, when the page loads, then no publication rows are rendered', async ({ page }) => {
  const app = new SportHubPage(page);

  await writeData([]);
  await app.goto();

  await expect(app.publicationRows).toHaveCount(0);
  await expect(page.getByText('Periódicos en lista')).toBeVisible();
});

test('Given the last remaining publication is deleted, when the user confirms removal, then the list is empty', async ({ page }) => {
  const app = new SportHubPage(page);

  await writeData([
    {
      id: 1,
      url: 'https://www.marca.com',
      name: 'Marca',
      period: 'MA',
      logoText: 'MA',
      order: 1,
    },
  ]);

  await app.goto();
  await app.deletePublication('Marca');

  await expect(app.publicationRows).toHaveCount(0);
  await expect(page.locator('.publication-name')).toHaveCount(0);
});

test('Given the application is viewed on a small viewport, when the layout is rendered, then the cards and table remain usable', async ({ page }) => {
  const app = new SportHubPage(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await app.goto();

  await expect(app.page.getByRole('heading', { name: 'SportHub News' })).toBeVisible();
  await expect(app.page.locator('.summary-card')).toHaveCount(3);
  await expect(app.page.locator('table')).toBeVisible();
  await expect(app.publicationRows).toHaveCount(4);
});
