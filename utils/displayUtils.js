const getRandom = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  getRandom
}