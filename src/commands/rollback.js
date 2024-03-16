const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('rollback')
          .setDescription('Rollback users & roles.'),
          
  run: ({ interaction }) => {
    
  },
};