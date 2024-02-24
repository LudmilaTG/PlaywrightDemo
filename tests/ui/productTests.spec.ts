import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { ProductDetailsPage } from '../../pages/product-details-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { HomePage } from '../../pages/home-page';
import { CartPage } from '../../pages/cart-page';
import { productName, productPrice } from '../../data/productData.json';

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
    await homePage.checkIfPageOpened();
});

test('ordering product', async () => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    await homePage.findAndOpenProductByName(productName);
    await productDetailsPage.checkIfPageOpened();
    await productDetailsPage.addProductToCart();
    await productDetailsPage.goToCart();

    await cartPage.checkIfPageOpened();
    await cartPage.checkIfAmountProductsIs(1);
    await cartPage.checkIfFirstProductPriceIs(productPrice);
    await cartPage.submitCart();

    await checkoutPage.checkIfPageOpened();
    await checkoutPage.fillAllFieldWithValidValuesAndContinue();
    await checkoutPage.checkIfAmountProductsIs(1);
    await checkoutPage.checkIfNameFirstProductIs(productName);
    await checkoutPage.checkIfPriceFirstProductIs(productPrice);
    await checkoutPage.clickFinishButton();
})

test('sorting products by price increasing', async () =>
    await homePage.checkIfProductsSortedByPriceInAscendingOrder('Price (low to high)'))

test('sorting products by price decreasing', async () =>
    await homePage.checkIfProductsSortedByPriceInDescendingOrder('Price (high to low)'))

test('sorting products by name A - Z', async () =>
    await homePage.checkIfProductsSortedByNameInAscendingOrder('Name (A to Z)'))

test('sorting products by name Z - A', async () =>
    await homePage.checkIfProductsSortedByNameInDescendingOrder('Name (Z to A)'))