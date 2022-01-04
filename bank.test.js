const techTest = require("./bank.js");

test("Returns Hello World!", () => {
  expect(techTest()).toEqual("Hello World!");
});
