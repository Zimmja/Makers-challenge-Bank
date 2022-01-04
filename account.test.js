const Account = require("./account.js");

const testAccount = new Account();

describe(".deposit", () => {
  test("Creates a new transaction", () => {
    const testTrans = testAccount.transactions.length;
    testAccount.deposit(10);
    expect(testAccount.transactions.length).toBe(testTrans + 1);
  });

  test("Increases the balance", () => {
    checkDesposit(testAccount, 10);
  });

  test("Works with decimals", () => {
    checkDesposit(testAccount, 10.5);
  });

  test("Works with too many decimals", () => {
    checkDesposit(testAccount, 10.9999999999, 10.99);
  });
});

const checkDesposit = (account, mod, expectation = mod) => {
  account.balance = 0;
  account.deposit(mod);
  expect(account.balance).toBe(expectation);
};
