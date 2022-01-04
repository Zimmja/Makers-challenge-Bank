class Transaction {
  constructor(timestamp, balance, amount, isDeposit) {
    this.timestamp = timestamp;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
  }

  getData = () => {
    return {
      time: this.transDate(),
      balance: this.transBalance(),
      credit: this.transCredit(),
      debit: this.transDebit(),
    };
  };

  transDebit = (amount = this.amount) => {
    return !this.isDeposit ? this.formatMoney(amount) : null;
  };

  transCredit = (amount = this.amount) => {
    return this.isDeposit ? this.formatMoney(amount) : null;
  };

  transBalance = (balance = this.balance, amount = this.amount) => {
    return this.formatMoney(balance + amount);
  };

  transDate = (time = this.timestamp) => {
    const day = this.formatTime(time.getDate()),
      month = this.formatTime(time.getMonth() + 1),
      year = this.formatTime(time.getFullYear());
    return `${day}/${month}/${year}`;
  };

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
