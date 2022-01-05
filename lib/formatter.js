class Formatter {
  money = (balance) => {
    const balanceInt = parseInt(balance);
    if (balanceInt === balance) return `${balance}.00`;
    const decs = balance.toString().split(".")[1];
    const decsFormatted = this.decimal(decs);
    return `${balanceInt}.${decsFormatted}`;
  };

  decimal = (decimal) => {
    const decimalNumbers = decimal.split("");
    const decimalLen = decimalNumbers.length;
    if (decimalLen <= 1) return `${decimal}0`;
    if (decimalLen > 2) return `${decimalNumbers.slice(0, 2).join("")}`;
    return decimal;
  };

  time = (time) => (time < 10 ? `0${time}` : `${time}`);
}

module.exports = Formatter;
