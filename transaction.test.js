const Transaction = require("./transaction.js");

const testDate = {
  getDate: () => 5,
  getMonth: () => 0,
  getFullYear: () => 2022,
};
const transDeposit01 = new Transaction(testDate, 100.5, 50, true);
const transWithdrawal01 = new Transaction(testDate, 100.55, 50, false);
const transTooManyDecs = new Transaction(testDate, 100.22, 50.888888, false);

describe(".getData", () => {
  test("Returns data for deposits", () => {
    expect(transDeposit01.getData()).toEqual({
      time: "05/01/2022",
      balance: "150.50",
      credit: "50.00",
      debit: null,
    });
  });

  test("Returns data for withdrawals", () => {
    const transData = transWithdrawal01.getData();
    expect(transData.credit).toEqual(null);
    expect(transData.debit).toEqual("50.00");
  });

  test("Doesn't break when too many decimals are given", () => {
    const transData = transTooManyDecs.getData();
    expect(transData.balance).toEqual("151.10");
  });
});
