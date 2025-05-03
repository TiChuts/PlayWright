const { expect } = require("@playwright/test");
const { BASE_URL } = require("../config/urls");
const locators = require("../config/locators");
const { getCredentials } = require("../utils/readCredentials");
const credentials = getCredentials();

class Book {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async openBrowser() {
    await this.page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });
  }

  async goToBooks() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.bookSite.value}`).click();
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
      if (!lowerResultText.includes(lowerSearchText)) {
        throw new Error(
          `Expected "${lowerResultText}" to contain "${lowerSearchText}"`
        );
      }
    }
  }

  async goToLogin() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.loginSite.value}`).click();
  }

  async goToProfile() {
    await this.page.evaluate(() => window.scrollBy(0, 300));
    await this.page.locator(`xpath=${locators.profileSite.value}`).click();
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

  async clickDelBook() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent("dialog"),

      (async () => {
        await this.page.locator(`xpath=${locators.deleteButton.value}`).click();
        await this.page
          .getByRole(locators.delOKButton.role, {
            name: locators.delOKButton.name,
          })
          .click();
      })(),
    ]);
    console.log("Dialog shown:", dialog.message());
    expect(dialog.message()).toBe("Book deleted.");
    await dialog.accept();
  }

  async checkBooks() {
    await expect(page.locators.checkBooks.toBeVisible());
  }

  async deleteBookByName(bookName) {
    // click Delete & OK button
    const iconDelete = this.page.locator(`//span[.='${bookName}']/ancestor::div[@role='row']//span[@title='Delete']`);
    const btnOk = this.page.locator("//button[.='OK']");
    await iconDelete.click();
    await btnOk.click();

    // Accept dialog
    let event = "accept";
    await this.page.waitForEvent('dialog').then(async d => {
      if (event == 'dismiss') {
          await d.dismiss();
      } else {
          await d.accept();
      }
      return d.message();
    })
  }

  async isBookVisible(bookName) {
    const lnkBook = this.page.locator("//a[text()='${bookName.trim()}']")
    return lnkBook.isVisible()
  }
}
module.exports = { Book };
