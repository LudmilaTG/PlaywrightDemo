import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly checkoutContainer: Locator = this.page.locator('#header_container');
    readonly checkoutText: string = 'Checkout: Your Information';
    readonly firstNameField: Locator = this.page.locator('#first-name');
    readonly lastNameField: Locator = this.page.locator('#last-name');
    readonly zipCodeField: Locator = this.page.locator('#postal-code');
    readonly continueButton: Locator = this.page.locator('#continue');
    readonly finishButton: Locator = this.page.locator('#finish');
    readonly cartItem: Locator = this.page.locator(".cart_item");
    readonly nameFisrtItem: Locator = this.page.locator('.inventory_item_name');
    readonly priceFirstItem: Locator = this.page.locator('.inventory_item_price');
    readonly thankyouTextContaner: Locator = this.page.locator('#checkout_complete_container');
    readonly thankyouText: string = 'Thank you for your order!';

    constructor(readonly page: Page) { }

    public async checkIfPageOpened() {
        await expect(this.checkoutContainer).toContainText(this.checkoutText);
    }

    public async fillAllFieldWithValidValuesAndContinue() {
        await this.fillField(this.firstNameField, 'aaa');
        await this.fillField(this.lastNameField, 'bbb');
        await this.fillField(this.zipCodeField, '12345');
        await expect(this.continueButton).toBeVisible();
        await (this.continueButton).click();
    }

    public async checkIfAmountProductsIs(amount) {
        await expect(async () => {
            const count = await this.cartItem.count();
            await expect(count).toBe(amount);
        }).toPass({ timeout: 20000 });
    }

    public async checkIfNameFirstProductIs(text) {
        await expect(this.nameFisrtItem).toContainText(text);
    }

    public async checkIfPriceFirstProductIs(price) {
        await expect(this.priceFirstItem).toContainText(price);
    }

    public async clickFinishButton() {
        await expect(this.finishButton).toBeVisible();
        await (this.finishButton).click();

        await expect(this.thankyouTextContaner).toContainText(this.thankyouText);
    }

    private async fillField(locator: Locator, text) {
        await (locator).clear();
        await (locator).fill(text);
        await expect(locator).toHaveValue(text);
    }
}