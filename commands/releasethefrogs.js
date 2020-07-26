const gifs = require('../resources/gifs.json');

module.exports = {
  name: 'releasethefrogs',
  desc: 'Sends the release_the_frogs gif',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      return message.channel.send(gifs.release_the_frogs);
    } catch (err) {
      console.log(`ERROR: Command <releasethefrogs> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}