const base = require("@playwright/test");
const { Book } = require("../pages/book.page");

const test = base.test.extend({
  /**
   * @param {import('@playwright/test').Page} page
   * @param {Function} use
   */
  book: async ({ page }, use) => {
    const book = new Book(page);
    await use(book);
  },
});

const expect = base.expect;

module.exports = { test, expect };
