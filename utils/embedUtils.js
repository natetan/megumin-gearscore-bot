/**
 * Utility class to create Discord Embeds
 */

const Discord = require('discord.js');
const prefix = process.env.prefix || '?';

const createGeneralHelp = commands => {
  let desc = '`[param]` = optional\n`<param>` = required\n';
  let embed = new Discord.MessageEmbed()
    .setColor('#93e9be')
    .setTitle('General Commands')
    .setDescription(desc)
  let generalCommands = Object.keys(commands.general);
  generalCommands.forEach((c) => {
    embed.addField(`**${c}** - *${commands.general[c].desc}*`, `\`${prefix}${c} ${commands.general[c].usage}\`\n`);
  });
  return embed;
}

const createSpecializedHelp = commands => {
  let embed = new Discord.MessageEmbed()
    .setColor('#93e9be')
    .setTitle('Specialized Commands')
  let specializedCommands = Object.keys(commands.specialized);
  specializedCommands.forEach((c) => {
    embed.addField(`${c} - ${commands.specialized[c].desc}`, commands.specialized[c].options);
  });
  return embed;
}

const createGsRanking = list => {
  let desc = '';
  list.forEach(i => {
    desc += `${i.rank}. ${i.name} - ${i.gs}\n`
  });
  const embed = new Discord.MessageEmbed()
    .setColor('#93e9be')
    .setTitle(`Gearscore Top ${list.length} Ranking`)
    .setDescription(desc);
  return embed;
}

module.exports = {
  createGeneralHelp,
  createSpecializedHelp,
  createGsRanking
}