const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Roles management')
    .addSubcommand((subcommand) => subcommand
      .setName('create')
      .setDescription('Creates the roles for the shufflers')
    )
    .addSubcommand((subcommand) => subcommand
      .setName('delete')
      .setDescription('Deletes the roles created for the shufflers')
    )
  ,
  run: async ({ interaction }) => {
    
  }
}