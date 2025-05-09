const { expect } = require("@playwright/test");
const locators = require("./locators");
const { getCredentials } = require("../utils/readCredentials");
const credentials = getCredentials();

class BookPage {
  constructor(page) {
    this.page = page;
  }

  async goToBooks() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.bookSite.value}`).click();
  }

  async goToLogin() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.loginSite.value}`).click();
  }

  async goToProfile() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.profileSite.value}`).click();
  }

  async fillSearchBox(searchText) {
    await this.page
      .getByRole(locators.searchBox.role, { name: locators.searchBox.name })
      .fill(searchText);
  }

  async verifySearchResults(searchText) {
    await this.page.evaluate(() => window.scrollBy(0, 300));

    const elements = await this.page
      .locator(`xpath=${locators.searchResult.value}`)
      .all();

    const lowerSearchText = searchText.toLowerCase();
    for (const el of elements) {
      const resultText = await el.textContent();
      const lowerResultText = resultText.toLowerCase();
      expect(lowerResultText).toContain(lowerSearchText);
    }
  }

  async verifyBlankResult() {
    await this.page.evaluate(() => window.scrollBy(0, 300));

    const elements = await this.page
      .locator(`xpath=${locators.searchResult.value}`)
      .all();

    expect(elements.length).toBe(0);
  }

  async deleteBook() {
    await this.page.locator(`xpath=${locators.deleteButton.value}`).click();
    await this.page
      .getByRole(locators.delOKButton.role, {
        name: locators.delOKButton.name,
      })
      .click();

    let event = "accept";

    const dialog = await this.page.waitForEvent("dialog");

    console.log("Dialog message:", dialog.message());

    expect(dialog.message()).toBe("Book deleted.");

    if (event === "dismiss") {
      await dialog.dismiss();
    } else {
      await dialog.accept();
    }
  }

  async inputCredentials() {
    await this.page
      .locator(`xpath=${locators.username.value}`)
      .fill(credentials.username);
    await this.page
      .locator(`xpath=${locators.password.value}`)
      .fill(credentials.password);

    await this.page.locator(`xpath=${locators.loginButton.value}`).click();

    await this.page.waitForTimeout(3000);
  }
}

module.exports = { BookPage };
