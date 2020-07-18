const db = require('../db/gearscoredb');

module.exports = {
  name: 'awk',
  desc: 'gets or sets a player\'s awk',
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
          return message.reply(`The AWK provided must be between ${min} and ${max}`);
        }
        const success = await db.set(user, 'awk', amount);
        if (success) {
          return message.reply(`your AWK has been successfully set to ${amount}.`);
        } else {
          return message.reply('sorry, there was an error.');
        }
      }
      const awk = await db.getUserProperty(message.author, 'awk');
      return message.reply(`your awk is ${awk}.`);
    } catch (err) {
      console.log(`ERROR: Command <awk> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}