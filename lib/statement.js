class Statement {
  constructor(transactions) {
    this.transArr = transactions;
  }

  printStatement = () => {
    const lines = this.createLinesArray();
    lines.forEach((line) => console.log(line));
  };

  createLinesArray = () => {
    const header = ["date || credit || debit || balance"];
    return header.concat(this.transactionLines());
  };

  transactionLines = () => {
    const lines = this.transArr.map((t) => this.createLine(t.getData()));
    return lines.reverse();
  };

  createLine = (trsx) => {
    const tCred = this.checkNull(trsx.credit),
      tDeb = this.checkNull(trsx.debit);
    return `${trsx.date} ||${tCred}||${tDeb}|| ${trsx.balance}`;
  };

  checkNull = (value) => (value === null ? " " : ` ${value} `);
}

module.exports = Statement;
