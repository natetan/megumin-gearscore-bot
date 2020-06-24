module.exports = {
  name: 'test',
  desc: 'Testing purposes',
  commandType: 'private',
  async execute(message, args, client) {
    try {
      client.emit("guildMemberAdd", message.member);
    } catch (err) {
      console.log(`ERROR: Command <test> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
};