const gifs = require('../resources/gifs.json');

module.exports = {
  name: 'praiseaqua',
  desc: 'Sends the praise_aqua gif',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      return message.channel.send(gifs.praise_aqua);
    } catch (err) {
      console.log(`ERROR: Command <praiseaqua> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}