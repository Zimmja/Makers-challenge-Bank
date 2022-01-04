class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  getStatement = () => {
    return "date || credit || debit || balance";
  };
}

module.exports = Statement;
