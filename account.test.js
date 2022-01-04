const Account = require("./account.js");

const dep01 = {
  balance: "10.00",
};
const with01 = {
  balance: "6.00",
};
const transDep01 = { getData: () => dep01 };
const transWith01 = { getData: () => with01 };
const testStatement = { printStatement: () => true };

describe(".deposit and .withdraw", () => {
  const tAcc = new Account();

  test("Create a new transaction", () => {
    const testTrans = tAcc.transactions.length;
    tAcc.deposit(0, transDep01);
    tAcc.withdraw(0, transWith01);
    expect(tAcc.transactions.length).toBe(testTrans + 2);
  });

  test("Set Account.balance to the balance value of the transaction", () => {
    expect(tAcc.deposit(0, transDep01)).toEqual(10);
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

describe(".statement", () => {
  const tAcc = new Account();

  test("Returns the number of transactions", () => {
    expect(tAcc.statement(testStatement)).toEqual(0);
    tAcc.deposit(0, transDep01);
    expect(tAcc.statement(testStatement)).toEqual(1);
  });
});
