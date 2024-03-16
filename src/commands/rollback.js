const { SlashCommandBuilder } = require('discord.js');
const commandHandler = require('../handlers/commandHandler');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('rollback')
          .setDescription('Rollback users & roles.')
  ,
  run: async ({ interaction }) => {
            await commandHandler.handleSlashCommand(interaction);
  },
  devOnly: true
};