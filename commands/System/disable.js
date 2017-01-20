exports.run = (client, msg, [commandname]) => {
  let command;
  if (client.commands.has(commandname)) {
    command = commandname;
  } else if (client.aliases.has(commandname)) {
    command = client.aliases.get(commandname);
  }
  if (!command) {
    return msg.channel.sendMessage(`I cannot find the command: \`${commandname}\``);
  }
  client.commands.get(command).conf.enabled = false;
  return msg.channel.sendMessage(`Successfully disabled: \`${commandname}\``);

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').send('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      title: "Command ran:",
      description: `${msg.content}`,
      timestamp: new Date(),
      footer: {
        text: `${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.avatarURL
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "disable",
  description: "Temporarily disables the command. Resets upon reboot.",
  usage: "<commandname:str>",
  usageDelim: "",
};
