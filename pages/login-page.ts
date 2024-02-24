import { expect, type Locator, type Page } from '@playwright/test';
import { login } from '../data/userData.json';
import { password } from '../data/userData.json';

export class LoginPage {
    readonly usernameField: Locator = this.page.locator('#user-name');
    readonly passwordField: Locator = this.page.locator('#password');
    readonly loginButton: Locator = this.page.locator('#login-button');
    readonly errorMessageContainer: Locator = this.page.locator('h3[data-test="error"]');

    constructor(readonly page: Page) { }

    async goto() {
        await this.page.goto('/');
    }

    async fillLoginData(username, password) {
        await this.usernameField.clear();
        await this.usernameField.fill(username);
        await expect(this.usernameField).toHaveValue(username);

        await this.passwordField.clear();
        await this.passwordField.fill(password);
        await expect(this.passwordField).toHaveValue(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async checkIfErrorMessageShown(error) {
        await expect(this.errorMessageContainer).toContainText(error);
    }

    async loginAsStandardUser() {
        await this.goto();
        await this.fillLoginData(login, password);
        await this.clickLoginButton();
    }
}