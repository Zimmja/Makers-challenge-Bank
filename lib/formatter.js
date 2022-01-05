class Formatter {
  money = (balance) => {
    const bInt = parseInt(balance);
    if (bInt === balance) return `${balance}.00`;
    const rDecimals = balance.toString().split(".")[1];
    const fDecimals = this.formatDecimals(rDecimals);
    return `${bInt}.${fDecimals}`;
  };

  formatDecimals = (decimal) => {
    const digits = decimal.split("");
    const dLen = digits.length;
    if (dLen <= 1) return `${decimal}0`;
    if (dLen > 2) return `${digits.slice(0, 2).join("")}`;
    return decimal;
  };

  time = (time) => (time < 10 ? `0${time}` : `${time}`);
}

module.exports = Formatter;
