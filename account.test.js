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
    tAcc.deposit(0, transDep01);
    tAcc.withdraw(0, transWith01);
    expect(tAcc.transactions.length).toBe(2);
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

  expect(tAcc.deposit(10)).toBeUndefined();
  expect(tAcc.withdraw(10)).toBeUndefined();
});

describe(".statement", () => {
  test("Returns undefined", () => {
    expect(tAcc.statement({ printStatement: () => true })).toBeUndefined();
  });

  expect(tAcc.statement()).toBeUndefined();
});
