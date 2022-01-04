class Transaction {
  constructor(timestamp, balance, amount, isDeposit) {
    this.timestamp = timestamp;
    this.balance = balance;
    this.amount = amount;
    this.isDeposit = isDeposit;
  }

  getData = () => {
    return { time: this.transDate(), balance: this.transBalance() };
  };

  transBalance = (balance = this.balance, amount = this.amount) => {
    return `${balance + amount}`;
  };

  transDate = (time = this.timestamp) => {
    const day = this.formatTime(time.getDate());
    const month = this.formatTime(time.getMonth() + 1);
    const year = this.formatTime(time.getFullYear());
    return `${day}/${month}/${year}`;
  };

  formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);
}

module.exports = Transaction;
