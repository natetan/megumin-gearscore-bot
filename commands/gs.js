const db = require('../db/gearscoredb');
const displayUtils = require('../utils/displayUtils');

module.exports = {
  name: 'gs',
  desc: 'gets a player\'s gs, which is (ap + awk) / 2 + dp',
  usage: '[number]',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const ap = await db.getUserProperty(message.author, 'ap');
      const dp = await db.getUserProperty(message.author, 'dp');
      const awk = await db.getUserProperty(message.author, 'awk');
      const gs = displayUtils.getGs(ap, dp, awk);

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