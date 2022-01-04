const Statement = require("./statement.js");

const testStatement = new Statement();

test("hello world", () => {
  expect(testStatement.sayHello()).toEqual("Hello world!");
});
