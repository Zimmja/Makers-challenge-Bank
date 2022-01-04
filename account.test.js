const Account = require("./account.js");

const testAccount = new Account();

describe("Creating transations", () => {
  test(".deposit creates a new transaction", () => {
    const testTrans = testAccount.transactions.length;
    testAccount.deposit(10);
    expect(testAccount.transactions.length).toBe(testTrans + 1);
  });

  test(".deposit increases the balance", () => {
    const testBalance = testAccount.balance;
    testAccount.deposit(10);
    expect(testAccount.balance).toBe(testBalance + 10);
    testAccount.deposit(10.5);
    expect(testAccount.balance).toBe(testBalance + 10 + 10.5);
    testAccount.deposit(10.999999999);
    expect(testAccount.balance).toBe(testBalance + 10 + 10.5 + 10.99);
  });
});
