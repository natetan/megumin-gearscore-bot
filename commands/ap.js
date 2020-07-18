const db = require('../db/gearscoredb');

module.exports = {
  name: 'ap',
  desc: 'gets or sets a player\'s ap',
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
          return message.reply(`The AP provided must be between ${min} and ${max}`);
        }
        const success = await db.set(user, 'ap', amount);
        if (success) {
          return message.reply(`your AP has been successfully set to ${amount}.`);
        } else {
          return message.reply('sorry, there was an error.');
        }
      }
      const ap = await db.getUserProperty(message.author, 'ap');
      return message.reply(`your AP is ${ap}.`);
    } catch (err) {
      console.log(`ERROR: Command <ap> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}