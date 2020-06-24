const fb = require('../db/firebaseUtil');

module.exports = {
  name: 'setap',
  desc: 'sets a player\'s ap',
  args: true,
  usage: '<number>',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      let ap = Number(args[0]);
      const min = 0;
      const max = 500;
      if (ap < min || ap > max) {
        return message.reply(`The AP provided must be between ${min} and ${max}`);
      }
      const success = await fb.set(message.author, 'ap', ap);
      if (success) {
        return message.reply(`Your AP has been successfully set to ${ap}.`);
      } else {
        return message.reply('Sorry, there was an error.');
      }
    } catch (err) {
      console.log(`ERROR: Command <setap> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}