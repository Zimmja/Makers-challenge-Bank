const Transaction = require("./transaction.js");

const testDate = {
  getDate: () => 5,
  getMonth: () => 0,
  getFullYear: () => 2022,
};
const transDeposit01 = new Transaction(100.55, 50.33, true, testDate);
const transWithdrawal01 = new Transaction(100.55, 50, false, testDate);
const transTooManyDecs = new Transaction(100.55, 50.7777777, true, testDate);
const transNoDecs = new Transaction(100, 50, true, testDate);
const transOneDec = new Transaction(100.5, 50.2, true, testDate);
const transDefault = new Transaction(100, 50);

describe("Initiation", () => {
  test("Can initiate without isDeposit or date specified", () => {
    const transData = transDefault.getData();
    expect(transData.credit).toEqual("50.00");
  });
});

describe(".getData", () => {
  test("Returns data for deposits", () => {
    expect(transDeposit01.getData()).toEqual({
      date: "05/01/2022",
      balance: "150.88",
      credit: "50.33",
      debit: null,
    });
  });

  test("Returns data for withdrawals", () => {
    const transData = transWithdrawal01.getData();
    expect(transData.credit).toEqual(null);
    expect(transData.debit).toEqual("50.00");
    expect(transData.balance).toEqual("50.55");
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
