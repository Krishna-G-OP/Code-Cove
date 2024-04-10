const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith('/') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ban') {
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('no bruh you cannot ban him.'); 
    const user = message.mentions.users.first();
    if (!user) return message.reply('bruh mention a user to ban.');
    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('Bruh he is not in this server.');
    member.ban({ reason: `Banned by ${message.author.tag}` })
     .then(() => message.reply(`${user.tag} has been banned.`))
     .catch(error => message.reply(`Failed to ban ${user.tag}: ${error}`));
  } else if (command === 'kick') {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You do not have permission to kick members.');
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to kick.');
    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('That user is not in this server.');
    member.kick({ reason: `Kicked by ${message.author.tag}` })
     .then(() => message.reply(`${user.tag} has been kicked.`))
     .catch(error => message.reply(`Failed to kick ${user.tag}: ${error}`));
  } else if (command === 'timeout') {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to timeout members.');
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to timeout.');
    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('That user is not in this server.');
    const duration = args[1];
    if (!duration) return message.reply('Please specify a duration for the timeout.');
    member.timeout(duration * 1000, { reason: `Timed out by ${message.author.tag}` })
     .then(() => message.reply(`${user.tag} has been timed out for ${duration} seconds.`))
     .catch(error => message.reply(`Failed to timeout ${user.tag}: ${error}`));
  } else if (command === 'mute') {
    if (!message.member.permissions.has('MUTE_MEMBERS')) return message.reply('You do not have permission to mute members.');
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to mute.');
    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply('That user is not in this server.');
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!role) return message.reply('There is no "Muted" role in this server.');
    member.roles.add(role)
     .then(() => message.reply(`${user.tag} has been muted.`))
     .catch(error => message.reply(`Failed to mute ${user.tag}: ${error}`));
  }
});

client.login('YOUR_BOT_TOKEN');