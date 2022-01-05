class Statement {
  constructor(transactions) {
    this.transArr = transactions;
    this.header = ["date || credit || debit || balance"];
  }

  printStatement = () => {
    const lines = this.createLinesArray();
    const printableStatement = lines.join("\n");
    console.log(printableStatement);
  };

  createLinesArray = () => this.header.concat(this.transactionLines());

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
