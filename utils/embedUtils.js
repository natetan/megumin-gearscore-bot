/**
 * Utility class to create Discord Embeds
 */

 const Discord = require('discord.js');
 const prefix = process.env.prefix || '?';

 const createGeneralHelp = commands => {
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

const createGsRanking = list => {
  let desc = '';
  list.forEach(i => {
    desc += `${i.rank}. ${i.name} - ${i.gs}\n`
  });
  const embed = new Discord.MessageEmbed()
    .setColor('#ff6600')
    .setTitle('Gearscore Top 10 Ranking')
    .setDescription(desc);
  return embed;
}

module.exports = {
  createGeneralHelp,
  createGsRanking
}