const { bookFixture, expect } = require("../fixtures/book.fixture");

bookFixture("delete book", async ({ bookPage, basePage }) => {
  await basePage.openBrowser();
  await bookPage.goToBooks();
  await bookPage.goToLogin();
  await bookPage.inputCredentials();
  await bookPage.goToProfile();

  const search = "Learning JavaScript Design Patterns";
  await bookPage.fillSearchBox(search);
  await bookPage.deleteBook();
  await bookPage.fillSearchBox(search);
  await bookPage.verifyBlankResult();
});
