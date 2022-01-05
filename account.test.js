const Account = require("./account.js");

const transDep15 = { getData: () => depos };
const depos = {
  balance: "15.00",
};
const transWith09 = { getData: () => withd };
const withd = {
  balance: "6.00",
};
const transDum = { getData: () => null };
const tAcc = new Account();

describe(".deposit / .withdraw", () => {
  beforeEach(() => {
    tAcc.balance = 0;
    tAcc.transactions = [];
  });

  test("Creates a new transaction object that is added to the transactions list", () => {
    tAcc.deposit(1, transDep15);
    tAcc.withdraw(1, transWith09);
    expect(tAcc.transactions.length).toBe(2);
  });

  test("Sets Account.balance to the balance value of the transaction", () => {
    expect(tAcc.deposit(1, transDep15)).toEqual(15);
    expect(tAcc.withdraw(1, transWith09)).toEqual(6);
  });

  test("Returns an error if a non-numerical value is entered", () => {
    expect(() => tAcc.deposit("Ten", transDum)).toThrowError(
      "ERROR: entered value must be a number"
    );
  });

  test("Will not accept values of <= 0", () => {
    expect(() => tAcc.deposit(0, transDum)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
    expect(() => tAcc.withdraw(-1, transDum)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
  });

  test("Will not accept invalid Transaction objects", () => {
    expect(() => tAcc.deposit(10, "transaction")).toThrowError(
      "ERROR: invalid transaction"
    );
  });

  test("Checking Transaction objects for 100% coverage", () => {
    expect(tAcc.deposit(10)).toEqual(10);
    expect(tAcc.withdraw(5)).toEqual(5);
  });
});

describe(".statement", () => {
  test("Returns undefined", () => {
    expect(tAcc.statement({ printStatement: () => true })).toBeUndefined();
  });

  test("Will not accept invalid Statement objects", () => {
    expect(() => tAcc.statement("statement")).toThrowError(
      "ERROR: invalid statement"
    );
  });

  test("Checking Statement objects for 100% coverage", () => {
    expect(tAcc.statement()).toBeUndefined();
  });
});
