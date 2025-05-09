const { test, expect } = require("@playwright/test");
const { BookPage } = require("../core/pages/book.page");
const { BasePage } = require("../core/pages/base.page");

const bookFixture = test.extend({
  bookPage: async ({ page }, use) => {
    const bookPage = new BookPage(page);
    await use(bookPage);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});
module.exports = { bookFixture, expect };
