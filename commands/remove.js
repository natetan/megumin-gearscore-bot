const Discord = require('discord.js');
const discordUtils = require('../utils/discordUtils');
const db = require('../db/gearscoredb');

module.exports = {
  name: 'remove',
  desc: 'Removes a user from the database',
  usage: '<user>',
  commandType: 'general',
  async execute(message, args, client) {
    const gmRoleId = process.env.gm_role_id || require('../auth.json').gm_role_id;
    const officerRoleId = process.env.officer_role_id || require('../auth.json').aero_role_id;
    const modRoleId = process.env.mod_role_id || require('../auth.json').aero_role_id;
    const permissions = [
      gmRoleId,
      officerRoleId,
      modRoleId
    ]

    const hasPermission = message.member.roles.cache.array().some(role => permissions.includes(role.id));
    if (!hasPermission) {
      return message.reply('you do not have permission to use that command.');
    }
    try {
      const userId = discordUtils.getUserIdFromMention(args[0], client);
      if (!userId) {
        return message.reply('please mention someone valid.');
      }
      await db.deleteUser(userId);
      return message.channel.send(`<@!${userId}> has been removed from the database`);
    } catch (err) {
      console.log(`ERROR: Command <remove> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}