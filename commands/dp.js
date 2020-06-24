const fb = require('../db/firebaseUtil');

module.exports = {
  name: 'dp',
  desc: 'gets a player\'s dp',
  usage: '<number>',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const dp = await fb.get(message.author, 'dp');
      if (dp >= 0) {
        return message.reply(`your DP is ${dp}.`);
      } else {
        return message.reply('your DP is not currently set.');
      }
    } catch (err) {
      console.log(`ERROR: Command <dp> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}