const { expect } = require("@playwright/test");
const { BASE_URL } = require("../../constants/urls_constants");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openBrowser() {
    await this.page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });
  }
}

module.exports = { BasePage };
