import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';
import { readFileSync } from "fs";

let page;
let userData;
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    userData = JSON.parse(readFileSync('data/userData.json', { encoding: 'utf8' }))
});

test.afterAll(async () => {
    await page.close();
  });

test.beforeEach(async () =>
    await loginPage.goto());

test('login with standard user', async () => {
    await loginPage.fillLoginData(userData.login, userData.password);
    await loginPage.clickLoginButton();

    await homePage.checkIfPageOpened();
    await homePage.logout();
})

test('login with wrong password', async () => {
    await loginPage.fillLoginData(userData.login, userData.password_wrong);
    await loginPage.clickLoginButton();

    await loginPage.checkIfErrorMessageShown('Epic sadface: Username and password do not match any user in this service');
});

test('login with wrong user', async () => {
    await loginPage.fillLoginData(userData.login_wrong, userData.password);
    await loginPage.clickLoginButton();

    await loginPage.checkIfErrorMessageShown('Epic sadface: Username and password do not match any user in this service');
})

test('login with locked user', async () => {
    await loginPage.fillLoginData(userData.login_locked, userData.password);
    await loginPage.clickLoginButton();

    await loginPage.checkIfErrorMessageShown('Epic sadface: Sorry, this user has been locked out.');
})