const Transaction = require("./transaction.js");

const testDate = {
  getDate: () => 5,
  getMonth: () => 0,
  getFullYear: () => 2022,
};

describe("Initiation", () => {
  test("Can initiate without the 'isDeposit' or 'date' properties being specified", () => {
    const trsx = testData(100, 50);
    expect(trsx.credit).toEqual("50.00");
  });
});

describe(".getData", () => {
  test("Returns data for deposits in a format that is easily readable", () => {
    const trsx = testData(100.55, 50.33, true, testDate);
    expect(trsx).toEqual({
      date: "05/01/2022",
      balance: "150.88",
      credit: "50.33",
      debit: null,
    });
  });

  test("Returns data for withdrawals in a format that is easily readable", () => {
    const trsx = testData(100.55, 50, false, testDate);
    expect(trsx.balance).toEqual("50.55");
    expect(trsx.credit).toEqual(null);
    expect(trsx.debit).toEqual("50.00");
  });
});

describe("Processing decimals", () => {
  test("Works when too many decimals are given", () => {
    const trsx = testData(100.55, 50.7777777);
    expect(trsx.balance).toEqual("151.32");
  });

  test("Works when no decimals are given", () => {
    const trsx = testData(100, 50);
    expect(trsx.balance).toEqual("150.00");
  });

  test("Works when one decimal is given", () => {
    const trsx = testData(100.5, 50.2);
    expect(trsx.balance).toEqual("150.70");
  });
});

const testData = (balance, amount, isDeposit = true, date = new Date()) => {
  const transactionObj = new Transaction(balance, amount, isDeposit, date);
  return transactionObj.getData();
};
