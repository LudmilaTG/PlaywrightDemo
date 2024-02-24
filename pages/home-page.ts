import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly shoppingCartButton: Locator = this.page.locator('#shopping_cart_container');
    readonly menuButton: Locator = this.page.locator('#react-burger-menu-btn');
    readonly closeMenuButton: Locator = this.page.locator('#react-burger-cross-btn');
    readonly pageTitle: Locator = this.page.locator('.app_logo');
    readonly allItemsLink: Locator = this.page.locator('#inventory_sidebar_link');
    readonly aboutLink: Locator = this.page.locator('#about_sidebar_link');
    readonly logoutLink: Locator = this.page.locator('#logout_sidebar_link');
    readonly resetAppStateLink: Locator = this.page.locator('#reset_sidebar_link');
    readonly sauceLabUniqItem: Locator = this.page.locator('img[alt="Saucelabs"]');
    readonly sauceLabTextLocator: Locator = this.page.locator('#__next');
    readonly sauceLabText: string = "The world relies on your code. Test on thousands of different device, browser, and OS configurations–anywhere, any time.";
    readonly sortingSelectBox: Locator = this.page.locator('.product_sort_container');
    readonly allPrices: Locator = this.page.locator('.inventory_item_price');
    readonly allProductNames: Locator = this.page.locator('.inventory_item_name');

    constructor(readonly page: Page) { }

    public async checkIfPageOpened() {
        await expect(this.shoppingCartButton).toBeVisible();
    }

    public async checkIfMenuIconShown() {
        await expect(this.menuButton).toBeVisible();
    }

    public async openMenu() {
        await (this.menuButton).click();
        await expect(this.closeMenuButton).toBeVisible();
    }

    public async checkIfAllSubMenuShown() {
        await expect(this.allItemsLink).toBeVisible();
        await expect(this.aboutLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
        await expect(this.resetAppStateLink).toBeVisible();
    }

    public async closeMenu() {
        await (this.closeMenuButton).click();
        await expect(this.closeMenuButton).toBeHidden();
    }

    public async checkAboutLink() {
        await this.openMenu();
        await (this.aboutLink).click();
        await expect(this.sauceLabTextLocator).toContainText(this.sauceLabText);
    }

    public async findAndOpenProductByName(name) {
        await expect(this.page.getByText(name)).toBeVisible();
        await (this.page.getByText(name)).click();
    }

    public async checkIfProductsSortedByPriceInAscendingOrder(sortKindText) {
        await this.checkIfProductsSortedByPrice(sortKindText, (a, b) => a - b);
    }

    public async checkIfProductsSortedByPriceInDescendingOrder(sortKindText) {
        await this.checkIfProductsSortedByPrice(sortKindText, (a, b) => b - a);
    }

    public async checkIfProductsSortedByNameInAscendingOrder(sortKindText) {
        await this.checkIfProductsSortedByName(sortKindText, (array) => { { array.sort(); return array; } });
    }

    public async checkIfProductsSortedByNameInDescendingOrder(sortKindText) {
        await this.checkIfProductsSortedByName(sortKindText, (array) => { array.sort(); array.reverse(); return array; });
    }

    public async logout() {
        await this.openMenu();
        await (expect(this.logoutLink).toBeVisible);
        await this.logoutLink.click();
    }

    private async checkIfProductsSortedByPrice(sortKindText, func) {
        let numbersArray: number[] = [];
        let sortedArray: number[] = [];

        await expect(this.sortingSelectBox).toBeVisible();
        await (this.sortingSelectBox).selectOption(sortKindText);

        for (const itemPrice of await this.allPrices.allInnerTexts()) {
            const text = await itemPrice.split('$').join('');

            await numbersArray.push(Number(text));
            await sortedArray.push(Number(text));
        }

        await sortedArray.sort(func);

        await expect(async () =>
            await expect(JSON.stringify(numbersArray) === JSON.stringify(sortedArray)).toBe(true)).toPass();
    }

    private async checkIfProductsSortedByName(sortKindText, func) {
        let numbersArray: string[] = [];
        let sortedArray: string[] = [];

        await expect(this.sortingSelectBox).toBeVisible();
        await (this.sortingSelectBox).selectOption(sortKindText);

        for (const itemName of await this.allProductNames.allInnerTexts()) {
            await numbersArray.push(itemName);
            await sortedArray.push(itemName);
        }

        sortedArray = func(sortedArray)

        await expect(async () =>
            await expect(JSON.stringify(numbersArray) === JSON.stringify(sortedArray)).toBe(true)).toPass();
    }
}