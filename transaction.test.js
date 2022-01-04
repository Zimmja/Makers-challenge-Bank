const Transaction = require("./transaction.js");

const testTransaction = new Transaction();

test("Returns Hello World!", () => {
  expect(testTransaction.sayHello()).toEqual("Hello World!");
});
