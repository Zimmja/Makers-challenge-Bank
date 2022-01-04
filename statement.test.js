const Statement = require("./statement.js");

const trans01Data = {
  time: "10/01/2023",
  balance: "1000.00",
  credit: "1000.00",
  debit: null,
};
const trans02Data = {
  time: "13/01/2023",
  balance: "2000.00",
  credit: "3000.00",
  debit: null,
};
const trans03Data = {
  time: "14/01/2023",
  balance: "1000.00",
  credit: null,
  debit: "2500.00",
};

const trans01 = { getData: () => trans01Data };
const trans02 = { getData: () => trans02Data };
const trans03 = { getData: () => trans03Data };
const sEmpty = new Statement([]);
const sPart = new Statement([trans01]);
const sFull = new Statement([trans01, trans02, trans03]);

test("hello world", () => {
  expect(sEmpty.getStatement()).toEqual("date || credit || debit || balance");
});
