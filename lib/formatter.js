class Formatter {
  money = (balance) => {
    const bInt = parseInt(balance);
    if (bInt === balance) return `${balance}.00`;
    const rDecimals = balance.toString().split(".")[1];
    return `${bInt}.${this.formatDecimals(rDecimals)}`;
  };

  formatDecimals = (decimal) => {
    const digits = decimal.split("");
    const dLen = digits.length;
    if (dLen > 2) return `${digits.slice(0, 2).join("")}`;
    return dLen <= 1 ? `${decimal}0` : decimal;
  };

  time = (time) => (time < 10 ? `0${time}` : `${time}`);
}

module.exports = Formatter;
