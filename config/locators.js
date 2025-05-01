module.exports = {
  bookSite: { type: "xpath", value: "//h5[text()='Book Store Application']" },
  searchBox: { role: "textbox", name: "Type to search" },
  searchResult: { type: "xpath", value: "//div[@class='action-buttons']//a" },
  loginSite: { type: "xpath", value: "//span[text()='Login']" },
  username: { type: "xpath", value: "//input[@id='userName']" },
  password: { type: "xpath", value: "//input[@id='password']" },
  loginButton: { type: "xpath", value: "//button[@id='login']" },
  profileSite: { type: "xpath", value: "//span[text()='Profile']" },
  deleteButton: {
    type: "xpath",
    value: "//span[@id='delete-record-undefined']",
  },
  delOKButton: { role: "button", name: "OK" },
  emptyRows: { type: "xpath", value: "//div[text()='No rows found']" },
};
