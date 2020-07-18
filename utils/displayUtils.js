const getRandom = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getGs = (ap, dp, awk) => {
  return Math.round((ap + awk) / 2.00) + dp;
}

module.exports = {
  getRandom,
  getGs
}