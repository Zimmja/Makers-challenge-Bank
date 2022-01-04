class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  getStatement = () => {
    const mappedTrans = this.transactions.map((trans) =>
      this.createTransLine(trans.getData())
    );
    const header = ["date || credit || debit || balance"];
    return header.concat(mappedTrans.reverse());
  };

  createTransLine = (tData) => {
    const tCred = this.checkNull(tData.credit),
      tDeb = this.checkNull(tData.debit);
    return `${tData.date} ||${tCred}||${tDeb}|| ${tData.balance}`;
  };

  checkNull = (value) => (value === null ? " " : ` ${value} `);
}

module.exports = Statement;
