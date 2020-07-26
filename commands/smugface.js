const gifs = require('../resources/gifs.json');

module.exports = {
  name: 'smugface',
  desc: 'Sends the smug_face gif',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      return message.channel.send(gifs.smug_face);
    } catch (err) {
      console.log(`ERROR: Command <smugface> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}