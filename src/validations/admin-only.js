const { PermissionsBitField } = require('discord.js');

module.exports = (interaction, commandObj, handler, client) => {
  if (commandObj.adminOnly) {
    if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
      interaction.reply('This command is for admins only');
      return true;
    }
  }
};