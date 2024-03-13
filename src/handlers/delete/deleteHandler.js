const deleteShuffleRoles = require('./deleteShuffleRoles');

module.exports = {
  async handleSubCommand(interaction) {
      const subcommand = interaction.options.getSubcommand();
      // Respondo antes porque sino tarda mucho
      interaction.reply({ content: 'Deleting ' + subcommand + '!!!', ephemeral: true});
      switch (subcommand) {
          case 'shuffleroles':
              await deleteShuffleRoles.execute(interaction);
              break;
          default:
              // Manejar comando no reconocido
              break;
      }
  }
}