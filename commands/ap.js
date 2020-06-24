const fb = require('../db/firebaseUtil');

module.exports = {
  name: 'ap',
  desc: 'gets a player\'s ap',
  usage: '<number>',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      const ap = await fb.get(message.author, 'ap');
      if (ap >= 0) {
        return message.reply(`your AP is ${ap}.`);
      } else {
        return message.reply('your AP is not currently set.');
      }
    } catch (err) {
      console.log(`ERROR: Command <ap> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}