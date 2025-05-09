const { bookFixture, expect } = require("../fixtures/book.fixture");

bookFixture("search book", async ({ bookPage, basePage }) => {
  await basePage.openBrowser();
  await bookPage.goToBooks();

  const searchTerms = ["Design", "design"];
  for (const term of searchTerms) {
    await bookPage.fillSearchBox(term);
    await bookPage.verifySearchResults(term);
  }
});
