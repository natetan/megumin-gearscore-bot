module.exports = {
  name: 'test',
  desc: 'Testing purposes',
  commandType: 'private',
  async execute(message, args, client) {
    try {
      const hasPermission = mesasge.author.id === process.env.aero_id ? process.env.aero_id : require('../auth.json').aero_id;
      if (hasPermission) {
        client.emit("guildMemberRemove", message.member);
      }
    } catch (err) {
      console.log(`ERROR: Command <test> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
};