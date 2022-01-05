const Account = require("./account.js");

const dep01 = {
  balance: "10.00",
};
const with01 = {
  balance: "6.00",
};
const transDep01 = { getData: () => dep01 };
const transWith01 = { getData: () => with01 };
const tAcc = new Account();

describe(".deposit and .withdraw", () => {
  test("Create a new transaction", () => {
    tAcc.deposit(1, transDep01);
    tAcc.withdraw(1, transWith01);
    expect(tAcc.transactions.length).toBe(2);
  });

  test("Set Account.balance to the balance value of the transaction", () => {
    expect(tAcc.deposit(1, transDep01)).toEqual(10);
  });

  test("Returns an error if a non-monetary value is entered", () => {
    expect(() => tAcc.deposit("Ten", transDep01)).toThrowError(
      "ERROR: entered value must be a number"
    );
    expect(() => tAcc.deposit("10", transDep01)).not.toThrowError(
      "ERROR: entered value must be a number"
    );
  });

  test("Will not accept values of 0 for deposit or withdrawal", () => {
    expect(() => tAcc.deposit(0, transDep01)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
    expect(() => tAcc.withdraw([], transDep01)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
  });

  test("Will not accept incorrect transaction objects", () => {
    expect(() => tAcc.deposit(10, "transaction")).toThrowError(
      "ERROR: invalid transaction"
    );
  });

  test("Checking Transaction objects for 100% coverage", () => {
    const unmockedAccount = new Account();
    expect(unmockedAccount.deposit(10)).toEqual(10);
    expect(unmockedAccount.withdraw(5)).toEqual(5);
  });
});

describe(".statement", () => {
  test("Returns undefined", () => {
    expect(tAcc.statement({ printStatement: () => true })).toBeUndefined();
  });

  test("Checking Statement objects for 100% coverage", () => {
    expect(tAcc.statement()).toBeUndefined();
  });
});
