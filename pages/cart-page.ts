import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly checkoutButton: Locator = this.page.locator('#checkout');
    readonly cartItem: Locator = this.page.locator('.cart_item');
    readonly itemPrice: Locator = this.page.locator('.inventory_item_price');

    constructor(readonly page: Page) { }

    async checkIfPageOpened() {
        await expect(this.checkoutButton).toBeVisible();
    }

    async checkIfAmountProductsIs(amount) {
        await expect(async () => {
            const count = await this.cartItem.count();
            await expect(count).toBe(amount);
        }).toPass();
    }

    async checkIfFirstProductPriceIs(price) {
        await expect(this.itemPrice).toBeVisible;
        await expect(this.itemPrice).toContainText(price);
    }

    async submitCart() {
        await expect(this.checkoutButton).toBeVisible();
        await (this.checkoutButton).click();
    }
}