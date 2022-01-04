const Transaction = require("./transaction.js");

test("Packages data into an easily readable format", () => {
  const testTransaction = new Transaction(new Date(), 100.5, 50, true);
  expect(testTransaction.getData()).toEqual({
    time: "04/01/2022",
    balance: "150.50",
    credit: "50.00",
    debit: null,
  });
});
