const Account = require("./account.js");

const testAccount = new Account();

const dep01 = {
  balance: "10.00",
};

const dep02 = {
  balance: "10.50",
};

const dep03 = {
  balance: "10.99",
};

const transDep01 = { getData: () => dep01 };
const transDep02 = { getData: () => dep02 };
const transDep03 = { getData: () => dep03 };

describe(".deposit", () => {
  test("Creates a new transaction", () => {
    const testTrans = testAccount.transactions.length;
    testAccount.deposit(10, transDep01);
    expect(testAccount.transactions.length).toBe(testTrans + 1);
  });

  test("Increases the balance", () => {
    checkDesposit(testAccount, 10, transDep01);
  });

  test("Works with decimals", () => {
    checkDesposit(testAccount, 10.5, transDep02);
  });

  test("Works with too many decimals", () => {
    checkDesposit(testAccount, 10.999999, transDep03);
  });
});

const checkDesposit = (account, amount, transaction) => {
  account.balance = 0;
  account.deposit(amount, transaction);
  expect(account.balance).toBe(Number(transaction.getData().balance));
};
