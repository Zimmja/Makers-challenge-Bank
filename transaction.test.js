const Transaction = require("./transaction.js");

const testTransaction = new Transaction(new Date(), 100.5, 50, true);

test("Packages data into an easily readable format", () => {
  expect(testTransaction.getData()).toEqual({
    time: "04/01/2022",
    balance: "150.50",
    credit: "50.00",
    debit: null,
  });
});
