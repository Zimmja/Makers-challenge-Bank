const Statement = require("./statement.js");

const trans01 = { getData: () => trans01Data };
const trans01Data = {
  date: "10/01/2023",
  balance: "1000.00",
  credit: "1000.00",
  debit: null,
};
const trans02 = { getData: () => trans02Data };
const trans02Data = {
  date: "13/01/2023",
  balance: "3000.00",
  credit: "2000.00",
  debit: null,
};
const trans03 = { getData: () => trans03Data };
const trans03Data = {
  date: "14/01/2023",
  balance: "2500.00",
  credit: null,
  debit: "500.00",
};

const sEmpty = new Statement([]);
const sFull = new Statement([trans01, trans02, trans03]);

describe(".createLinesArray", () => {
  test("Returns only a column header if the transactions list is empty", () => {
    expect(sEmpty.createLinesArray()).toEqual([
      "date || credit || debit || balance",
    ]);
  });

  test("The most recent transactions appear at the top of the list", () => {
    expect(sFull.createLinesArray()).toEqual([
      "date || credit || debit || balance",
      "14/01/2023 || || 500.00 || 2500.00",
      "13/01/2023 || 2000.00 || || 3000.00",
      "10/01/2023 || 1000.00 || || 1000.00",
    ]);
  });
});

describe(".printStatement", () => {
  test("Prints each line of .createLinesArray to the console", () => {
    console.log = jest.fn();
    sFull.printStatement();
    expect(console.log.mock.calls.length).toBe(4);
    expect(console.log.mock.calls[3][0]).toBe(
      "10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
