const eu = require('../utils/embedUtil');

module.exports = {
  name: 'help',
  desc: 'List all of my commands or info about a specific command.',
  async execute(message, args, client) {
    let option = args.shift();
    const commandObj = {};

    const { commands } = message.client;

    const generalCommands = commands.filter(c => {
      return c.commandType === 'general';
    });

    commandObj[this.name] = {
      desc: this.desc
    };
    generalCommands.forEach(c => {
      let obj = {};
      obj.desc = c.desc;
      obj.usage = c.usage || '';
      commandObj[c.name] = obj;
    });

    const embed = eu.createGeneralHelpEmbed(commandObj);
    return message.channel.send(embed);
  }
}