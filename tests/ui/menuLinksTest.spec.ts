import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';

let page;
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
});

test.afterAll(async () => {
    await page.close();
  });

test.beforeEach(async () => {
    await loginPage.loginAsStandardUser();
});

test('openning/closing menu items', async () => {
    await homePage.checkIfPageOpened();
    await homePage.checkIfMenuIconShown();
    await homePage.openMenu();
    await homePage.checkIfAllSubMenuShown();
    await homePage.closeMenu();
    await homePage.checkAboutLink();
})