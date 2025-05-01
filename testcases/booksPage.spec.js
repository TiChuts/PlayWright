const { test, expect } = require("../fixtures/book.fixture");

test("books has name", async ({ book }) => {
  await book.openBrowser();
  await book.goToBooks();

  const searchTerms = ["Design", "design"];
  for (const term of searchTerms) {
    await book.fillSearchBox(term);
    await book.verifySearchResults(term);
  }
});

test("delete books", async ({ book }) => {
  await book.openBrowser();
  await book.goToBooks();
  await book.goToLogin();
  await book.inputCredentials();
  await book.goToProfile();

  const search = "Learning JavaScript Design Patterns";
  await book.fillSearchBox(search);
  await book.clickDelBook();
  await book.fillSearchBox(search);
  // await book.checkBooks();
});
