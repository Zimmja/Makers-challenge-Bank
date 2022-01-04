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
    tAcc.deposit(10, transDep01);
    expect(tAcc.transactions.length).toBe(testTrans + 1);
  });

  test("Set Account.balance to the balance value of the transaction", () => {
    tAcc.balance = 0;
    tAcc.deposit(0, transDep01);
    expect(tAcc.balance).toBe(10);
    tAcc.withdraw(0, transWith01);
    expect(tAcc.balance).toBe(6);
  });
});
