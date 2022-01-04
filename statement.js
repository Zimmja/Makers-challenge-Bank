class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  getStatement = () => {
    const mappedTrans = this.transactions.map((trans) =>
      this.createTransLine(trans)
    );
    const header = ["date || credit || debit || balance"];
    return header.concat(mappedTrans.reverse());
  };

  createTransLine = (trans) => {
    const tData = trans.getData();
    const tDate = tData.date,
      tBal = tData.balance,
      tCred = this.checkNull(tData.credit),
      tDeb = this.checkNull(tData.debit);
    return `${tDate} ||${tCred}||${tDeb}|| ${tBal}`;
  };

  checkNull = (value) => (value === null ? " " : ` ${value} `);
}

module.exports = Statement;
