const fb = require('../db/firebaseUtil');

module.exports = {
  name: 'setdp',
  desc: 'sets a player\'s dp',
  args: true,
  usage: '<number>',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      let dp = Number(args[0]);
      const min = 0;
      const max = 500;
      if (dp < min || dp > max) {
        return message.reply(`The dp provided must be between ${min} and ${max}`);
      }
      const success = await fb.set(message.author, 'dp', dp);
      if (success) {
        return message.reply(`your DP has been successfully set to ${dp}.`);
      } else {
        return message.reply('sorry, there was an error.');
      }
    } catch (err) {
      console.log(`ERROR: Command <setdp> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}