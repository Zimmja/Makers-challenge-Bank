class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  printStatement = () => {
    const sArr = this.getStatement();
    sArr.forEach((line) => console.log(line));
  };

  getStatement = () => {
    const mappedTrans = this.transactions.map((trans) =>
      this.createTransLine(trans.getData())
    );
    const header = ["date || credit || debit || balance"];
    return header.concat(mappedTrans.reverse());
  };

  createTransLine = (trans) => {
    const tCred = this.checkNull(trans.credit),
      tDeb = this.checkNull(trans.debit);
    return `${trans.date} ||${tCred}||${tDeb}|| ${trans.balance}`;
  };

  checkNull = (value) => (value === null ? " " : ` ${value} `);
}

module.exports = Statement;
