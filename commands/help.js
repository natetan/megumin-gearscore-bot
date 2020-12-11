const eu = require('../utils/embedUtils');

module.exports = {
  name: 'help',
  desc: 'List all of my commands or info about a specific command.',
  async execute(message, args, client) {
    const generalObj = {};
    const specialObj = {};

    const { commands } = message.client;

    const generalCommands = commands.filter((command) => {
      return command.commandType === 'general';
    });

    generalObj[this.name] = {
      desc: this.desc,
      usage: this.usage ? this.usage : ''
    };
    generalCommands.forEach((c) => {
      let obj = {};
      obj.desc = c.desc;
      obj.usage = c.usage || '';
      generalObj[c.name] = obj;
    });

    let specialCommands = commands.filter((command) => {
      return command.commandType === 'special';
    });

    let imgenCommands = [];
    const specialCommandMap = {
      'imgen': imgenCommands,
    };
    specialCommands.forEach((c) => {
      specialCommandMap[c.category].push(c.name);
    });

    specialObj['imgen'] = {
      desc: 'Image manipulation for the memes.',
      options: imgenCommands.join(', ')
    }

    const mainObj = {
      general: generalObj,
      specialized: specialObj
    };

    const generalEmbed = eu.createGeneralHelp(mainObj);
    const specialEmbed = eu.createSpecializedHelp(mainObj);

    const channel = message.channel;
    
    try {
      await channel.send(generalEmbed);
      return channel.send(specialEmbed);
    } catch (err) {
      console.log(`ERROR: Command <help> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
      message.channel.send('There was an error.');
    }
  }
};