const Statement = require("./statement.js");

const trans01Data = {
  date: "10/01/2023",
  balance: "1000.00",
  credit: "1000.00",
  debit: null,
};
const trans02Data = {
  date: "13/01/2023",
  balance: "3000.00",
  credit: "2000.00",
  debit: null,
};
const trans03Data = {
  date: "14/01/2023",
  balance: "2500.00",
  credit: null,
  debit: "500.00",
};

const trans01 = { getData: () => trans01Data };
const trans02 = { getData: () => trans02Data };
const trans03 = { getData: () => trans03Data };
const sEmpty = new Statement([]);
const sPart = new Statement([trans01]);
const sFull = new Statement([trans01, trans02, trans03]);

describe(".getStatement", () => {
  test("Returns column header only if transactions are empty", () => {
    expect(sEmpty.getStatement()).toEqual([
      "date || credit || debit || balance",
    ]);
  });

  test("Returns a array of statement lines, starting with the header", () => {
    expect(sPart.getStatement()).toEqual([
      "date || credit || debit || balance",
      "10/01/2023 || 1000.00 || || 1000.00",
    ]);
  });

  test("The most recent transactions appear at the top of the list", () => {
    expect(sFull.getStatement()).toEqual([
      "date || credit || debit || balance",
      "14/01/2023 || || 500.00 || 2500.00",
      "13/01/2023 || 2000.00 || || 3000.00",
      "10/01/2023 || 1000.00 || || 1000.00",
    ]);
  });
});
