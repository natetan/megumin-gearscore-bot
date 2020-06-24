const Discord = require('discord.js');
const { createLogger, format, transports } = require('winston');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Read all the js files in /commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// Configure logger
let date = new Date().toISOString();
const logFormat = format.printf(info => {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 2)}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      // level: level,
      format: format.combine(format.colorize(), logFormat)
    })
  ]
});

// Logs in with the given token
const token = process.env.token || require('./auth.json')['token'];
client.login(token);

const defaultChannel = process.env.welcome_channel || require('./auth.json').bot_test_general_channel_id;
const prefix = process.env.prefix ? '!' : '?';

/**
 * The setup for when the bot launches 
 */
client.on('ready', () => {
  logger.info('Connected');
  logger.info(`Client ID: ${client.user.id}`);
  logger.info(client.user.tag);
  logger.info(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('guildMemberAdd', member => {
  const welcome = `Welcome <@${member.user.id}>! You can set your gearscore with \`${prefix}ap\`, \`${prefix}dp\`, and \`${prefix}awk\`.\nExample: \`${prefix}ap 200\``;
  member.guild.channels.cache.get(defaultChannel).send(welcome);
});

client.on('message', async message => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop called 'botception'
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  // Whenever we set args to true in one of our command files, 
  // it'll perform this check and supply feedback if necessary.
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  try {
    command.execute(message, args, client, logger);
  } catch (error) {
    console.error(error);
    message.reply(`there was an error trying to execute that command: ${command.name}`);
  }
});