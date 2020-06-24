const db = require('../db/gearscoredb');

module.exports = {
  name: 'gs',
  desc: 'gets a player\'s gs, which is ap + dp',
  usage: '[number]',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const ap = await db.get(message.author, 'ap');
      const dp = await db.get(message.author, 'dp');
      const awk = await db.get(message.author, 'awk');
      const gs = Math.round((ap + awk) / 2.00) + dp;
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