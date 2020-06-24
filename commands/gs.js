const fb = require('../db/firebaseUtil');

module.exports = {
  name: 'gs',
  desc: 'gets a player\'s gs, which is ap + dp',
  usage: '<number>',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const ap = await fb.get(message.author, 'ap');
      const dp = await fb.get(message.author, 'dp');
      const gs = ap + dp;
      if (gs >= 0) {
        return message.reply(`your gs is ${gs}.`);
      } else {
        return message.reply('your gs is not currently set.');
      }
    } catch (err) {
      console.log(`ERROR: Command <gs> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}