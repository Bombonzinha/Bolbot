const { GuildMember } = require('discord.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');
    interaction.reply({content:'This command is under developement. :C'});
  }
}