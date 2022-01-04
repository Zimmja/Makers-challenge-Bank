const Account = require("./account.js");

const tAcc = new Account();

const dep01 = {
  balance: "10.00",
};
const with01 = {
  balance: "6.00",
};
const transDep01 = { getData: () => dep01 };
const transWith01 = { getData: () => with01 };

describe(".deposit and .withdraw", () => {
  test("Create a new transaction", () => {
    const testTrans = tAcc.transactions.length;
    tAcc.deposit(0, transDep01);
    tAcc.withdraw(0, transWith01);
    expect(tAcc.transactions.length).toBe(testTrans + 2);
  });

  test("Set Account.balance to the balance value of the transaction", () => {
    tAcc.balance = 0;
    tAcc.deposit(0, transDep01);
    expect(tAcc.balance).toBe(10);
    tAcc.withdraw(0, transWith01);
    expect(tAcc.balance).toBe(6);
  });

  test("Returns an error if a non-monetary value is entered", () => {
    expect(() => tAcc.deposit("Ten", transDep01)).toThrowError(
      "Entered value is not a number"
    );
    expect(() => tAcc.deposit("10", transDep01)).not.toThrowError(
      "Entered value is not a number"
    );
  });
});

describe(".statement returns the number of transactions", () => {
  expect(tAcc.statement()).toEqual(0);
  tAcc.deposit(0, transDep01);
  expect(tAcc.statement()).toEqual(1);
});
