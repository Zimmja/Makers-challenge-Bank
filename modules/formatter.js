const fMoney = (balance) => {
  const balanceInt = parseInt(balance);
  if (balanceInt === balance) return `${balance}.00`;
  const decs = balance.toString().split(".")[1];
  const decsFormatted = this.fDecimal(decs);
  return `${balanceInt}.${decsFormatted}`;
};

const fDecimal = (decimal) => {
  const decimalNumbers = decimal.split("");
  const decimalLen = decimalNumbers.length;
  if (decimalLen <= 1) return `${decimal}0`;
  if (decimalLen > 2) return `${decimalNumbers.slice(0, 2).join("")}`;
  return decimal;
};

const fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

exports.fMoney = fMoney;
exports.fDecimal = fDecimal;
exports.fTime = fTime;
