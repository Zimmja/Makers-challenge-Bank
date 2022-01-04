class Transaction {
  constructor(balance, amount, isDeposit = true, date = new Date()) {
    this.date = date;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
  }

  // Primary function
  //----------------------------------------------------------------
  getData = () => {
    return {
      date: this.transDate(),
      balance: this.transBalance(),
      credit: this.transCredit(),
      debit: this.transDebit(),
    };
  };

  // Define the values within the hash returned by getData()
  //----------------------------------------------------------------
  transDebit = (amount = this.amount) => {
    return !this.isDeposit ? this.formatMoney(amount) : null;
  };

  transCredit = (amount = this.amount) => {
    return this.isDeposit ? this.formatMoney(amount) : null;
  };

  transBalance = (balance = this.balance, amount = this.amount) => {
    return this.formatMoney(balance + amount);
  };

  transDate = (time = this.date) => {
    const day = this.formatTime(time.getDate()),
      month = this.formatTime(time.getMonth() + 1),
      year = this.formatTime(time.getFullYear());
    return `${day}/${month}/${year}`;
  };

  // Format the values within the hash returned by getData()
  //----------------------------------------------------------------
  formatMoney = (balance) => {
    const balanceInt = parseInt(balance);
    if (balanceInt === balance) return `${balance}.00`;
    const decs = balance.toString().split(".")[1];
    const decsFormatted = this.formatDecimal(decs);
    return `${balanceInt}.${decsFormatted}`;
  };

  formatDecimal = (decimal) => {
    const decimalNumbers = decimal.split("");
    const decimalLen = decimalNumbers.length;
    if (decimalLen <= 1) return `${decimal}0`;
    if (decimalLen > 2) return `${decimalNumbers.slice(0, 2).join("")}`;
    return decimal;
  };

  formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);
}

module.exports = Transaction;
