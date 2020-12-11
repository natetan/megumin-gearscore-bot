const getRandom = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getGs = (ap, dp, awk) => {
  return Math.round((ap + awk) / 2.00) + dp;
}

const getRandomArrayIndex = array => {
  return Math.floor(Math.random() * array.length);
}

module.exports = {
  getRandom,
  getGs,
  getRandomArrayIndex
}