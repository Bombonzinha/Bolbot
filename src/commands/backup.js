const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('backup')
          .setDescription('Backup users & roles.'),
          
  run: ({ interaction }) => {
    
  },
};