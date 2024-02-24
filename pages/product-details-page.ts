import { expect, type Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
    readonly shoppingCartBadge: Locator = this.page.locator('.shopping_cart_badge');
    readonly addToCartButton: Locator = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');

    constructor(readonly page: Page) { }

    async checkIfPageOpened() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async addProductToCart() {
        await (this.addToCartButton).click();
        await expect(this.addToCartButton).toBeHidden();
        await expect(this.shoppingCartBadge).toBeVisible();
        await expect(this.shoppingCartBadge.getByText('1')).toBeVisible();
    }

    async goToCart() {
        await expect(this.shoppingCartBadge).toBeVisible();
        await (this.shoppingCartBadge).click();
    }
}