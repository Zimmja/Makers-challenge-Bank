const Transaction = require("../lib/transaction.js");

exports.vTransaction = (amount, trsx) => {
  if (trsx === true || trsx === false)
    trsx = new Transaction(this.balance, amount, trsx);
  if (!trsx.getData) throw "ERROR: invalid transaction";
  return trsx;
};

exports.vAmount = (amount) => {
  amount = Number(amount);
  if (isNaN(amount)) throw "ERROR: entered value must be a number";
  if (amount <= 0) throw "ERROR: entered value must be greater than 0";
  return amount;
};
