const Formatter = require("./formatter.js");

const testFormat = new Formatter();

describe("Money", () => {
  test("Returns an integer as a monetary value", () => {
    expect(testFormat.money(10)).toEqual("10.00");
  });

  test("Returns a monetary value when only one decimal place is given", () => {
    expect(testFormat.money(10.1)).toEqual("10.10");
  });

  test("Returns a monetary value when given as a monetary value", () => {
    expect(testFormat.money("10.10")).toEqual("10.10");
  });

  test("Cuts off additional digits over 2 decimal points without rounding", () => {
    expect(testFormat.money(10.77777777)).toEqual("10.77");
  });
});

describe("Time", () => {
  test("Correctly calculates values below 10", () => {
    expect(testFormat.time(9)).toEqual("09");
  });

  test("Correctly calculates values of 10 or more", () => {
    expect(testFormat.time(11)).toEqual("11");
  });
});
