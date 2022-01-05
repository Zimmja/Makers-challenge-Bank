const Transaction = require("./transaction.js");

const testDate = {
  getDate: () => 1,
  getMonth: () => 0,
  getFullYear: () => 2022,
};
const testFormat = { money: () => "50.00", time: () => "01" };

describe("Initiation", () => {
  test("Can initiate without the 'isDeposit' or 'date' properties being specified", () => {
    const transactionObj = new Transaction(100, 50);
    const trsx = transactionObj.getData(testFormat);
    expect(trsx.credit).toEqual("50.00");
  });
});

describe(".getData", () => {
  test("Returns data for deposits in a format that is easily readable", () => {
    const trsx = testData(0, 50, true, testDate);
    expect(trsx).toEqual({
      date: "01/01/2022",
      balance: "50.00",
      credit: "50.00",
      debit: null,
    });
  });

  test("Returns data for withdrawals in a format that is easily readable", () => {
    const trsx = testData(100, 50, false, testDate);
    expect(trsx.balance).toEqual("50.00");
    expect(trsx.credit).toEqual(null);
    expect(trsx.debit).toEqual("50.00");
  });
});

const testData = (balance, amount, isDeposit = true, date = new Date()) => {
  const transactionObj = new Transaction(balance, amount, isDeposit, date);
  return transactionObj.getData(testFormat);
};
