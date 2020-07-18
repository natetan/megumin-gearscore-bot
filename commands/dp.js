const db = require('../db/gearscoredb');

module.exports = {
  name: 'dp',
  desc: 'gets or sets a player\'s dp',
  usage: '[number]',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const amount = Number(args[0]);
      const user = message.author;
      if (amount) {
        const min = 0;
        const max = 500;
        if (amount < min || amount > max) {
          return message.reply(`The DP provided must be between ${min} and ${max}`);
        }
        const success = await db.set(user, 'dp', amount);
        if (success) {
          return message.reply(`your DP has been successfully set to ${amount}.`);
        } else {
          return message.reply('sorry, there was an error.');
        }
      }
      const dp = await db.getUserProperty(message.author, 'dp');
      return message.reply(`your DP is ${dp}.`);
    } catch (err) {
      console.log(`ERROR: Command <dp> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}