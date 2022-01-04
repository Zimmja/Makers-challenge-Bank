const Transaction = require("./transaction.js");

test("Packages data into an easily readable format for deposits", () => {
  const testTransaction = new Transaction(new Date(), 100.5, 50, true);
  expect(testTransaction.getData()).toEqual({
    time: "04/01/2022",
    balance: "150.50",
    credit: "50.00",
    debit: null,
  });
});

test("Packages data into an easily readable format for withdrawals", () => {
  const testTransaction = new Transaction(new Date(), 100.55, 50, false);
  expect(testTransaction.getData()).toEqual({
    time: "04/01/2022",
    balance: "150.55",
    credit: null,
    debit: "50.00",
  });
});

test("Doesn't break when too many decimals are given", () => {
  const testTransaction = new Transaction(new Date(), 100.222, 50.222, true);
  expect(testTransaction.getData()).toEqual({
    time: "04/01/2022",
    balance: "150.44",
    credit: "50.22",
    debit: null,
  });
});
