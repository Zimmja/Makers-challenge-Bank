const Transaction = require("./transaction.js");

const testDate = {
  getDate: () => 5,
  getMonth: () => 0,
  getFullYear: () => 2022,
};
const transDeposit01 = new Transaction(testDate, 100.55, 50.33, true);
const transWithdrawal01 = new Transaction(testDate, 100.55, 50.33, false);
const transTooManyDecs = new Transaction(testDate, 100.55, 50.7777777, false);
const transNoDecs = new Transaction(testDate, 100, 50, false);
const transOneDec = new Transaction(testDate, 100.5, 50.2, false);

describe(".getData", () => {
  test("Returns data for deposits", () => {
    expect(transDeposit01.getData()).toEqual({
      time: "05/01/2022",
      balance: "150.88",
      credit: "50.33",
      debit: null,
    });
  });

  test("Returns data for withdrawals", () => {
    const transData = transWithdrawal01.getData();
    expect(transData.credit).toEqual(null);
    expect(transData.debit).toEqual("50.33");
  });
});

describe("Processing decimals", () => {
  test("Works when too many decimals are given", () => {
    const transData = transTooManyDecs.getData();
    expect(transData.balance).toEqual("151.32");
  });

  test("Works when no decimals are given", () => {
    const transData = transNoDecs.getData();
    expect(transData.balance).toEqual("150.00");
  });

  test("Works when one decimal is given", () => {
    const transData = transOneDec.getData();
    expect(transData.balance).toEqual("150.70");
  });
});
