/**
 * Utility class to create Discord Embeds
 */

 const Discord = require('discord.js');
 const prefix = process.env.prefix || '?';

 const createGeneralHelpEmbed = commands => {
  let desc = '`[param]` = optional\n`<param>` = required\n';
  let embed = new Discord.MessageEmbed()
    .setColor('#ff6600')
    .setTitle('General Commands')
    .setDescription(desc);
  let generalCommands = Object.keys(commands);
  generalCommands.forEach((c) => {
    let usage = commands[c].usage ? commands[c].usage : '';
    embed.addField(`**${c}** - *${commands[c].desc}*`, `\`${prefix}${c} ${usage}\`\n`);
  });
  return embed;
}

module.exports = {
  createGeneralHelpEmbed
}