const Account = require("./account.js");

const testAccount = new Account();
const transTransaction = { getData: () => testTransactionBalance };
const testTransactionBalance = {
  balance: "15.00",
};

describe("Feature test", () => {
  beforeEach(() => {
    testAccount.transactions = [];
  });

  test("User can deposit, withdraw, and view a statement (unmocked except for date)", () => {
    console.log = jest.fn();
    testAccount.deposit(1000);
    testAccount.deposit(2000);
    testAccount.withdraw(500);
    testAccount.statement();
    const statementOutput = console.log.mock.calls[0][0];
    const mockedOutput = mockDates(statementOutput);
    expect(mockedOutput).toEqual(
      "date || credit || debit || balance\n01/01/2022 || || 500.00 || 2500.00\n01/01/2022 || 2000.00 || || 3000.00\n01/01/2022 || 1000.00 || || 1000.00"
    );
  });

  test("Works just as well with poor inputs", () => {
    console.log = jest.fn();
    testAccount.deposit(10.55);
    testAccount.deposit("7");
    testAccount.withdraw(10 + 10);
    testAccount.deposit(5.299999999);
    testAccount.deposit(10.2);
    testAccount.withdraw(1);
    testAccount.deposit("0.96");
    testAccount.statement();
    const statementOutput = console.log.mock.calls[0][0];
    const mockedOutput = mockDates(statementOutput);
    expect(mockedOutput).toEqual(
      [
        "date || credit || debit || balance",
        "01/01/2022 || 0.96 || || 13.00",
        "01/01/2022 || || 1.00 || 12.04",
        "01/01/2022 || 10.20 || || 13.04",
        "01/01/2022 || 5.29 || || 2.84",
        "01/01/2022 || || 20.00 || -2.45",
        "01/01/2022 || 7.00 || || 17.55",
        "01/01/2022 || 10.55 || || 10.55",
      ].join("\n")
    );
  });
});

const mockDates = (statement) => {
  const lines = statement.split("\n");
  const mLines = lines.map((line, i) => (i == 0 ? line : replaceDate(line)));
  return mLines.join("\n");
};

const replaceDate = (line) => {
  const datelessLine = line.slice(10, line.length);
  return "01/01/2022" + datelessLine;
};

describe(".deposit / .withdraw", () => {
  beforeEach(() => {
    testAccount.transactions = [];
  });

  test("Creates a new transaction object that is added to the transactions list", () => {
    testAccount.deposit(1, transTransaction);
    testAccount.withdraw(1, transTransaction);
    expect(testAccount.transactions.length).toBe(2);
  });

  test("Sets Account.balance to the balance value of the transaction", () => {
    expect(testAccount.deposit(1, transTransaction)).toEqual(15);
    expect(testAccount.withdraw(1, transTransaction)).toEqual(15);
  });

  test("Returns an error if a non-numerical value is entered", () => {
    expect(() => testAccount.deposit("Ten", transTransaction)).toThrowError(
      "ERROR: entered value must be a number"
    );
  });

  test("Will not accept values of <= 0", () => {
    expect(() => testAccount.deposit(0, transTransaction)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
    expect(() => testAccount.withdraw(-1, transTransaction)).toThrowError(
      "ERROR: entered value must be greater than 0"
    );
  });

  test("Will not accept invalid Transaction objects", () => {
    expect(() => testAccount.deposit(10, "transaction")).toThrowError(
      "ERROR: invalid transaction"
    );
  });
});

describe(".statement", () => {
  test("Returns undefined", () => {
    expect(
      testAccount.statement({ printStatement: () => true })
    ).toBeUndefined();
  });

  test("Will not accept invalid Statement objects", () => {
    expect(() => testAccount.statement("statement")).toThrowError(
      "ERROR: invalid statement"
    );
  });
});
