const rolesDelete = require('./rolesDelete');
const rolesCreate = require('./rolesCreate');

module.exports = {
  async handleSubCommand(interaction) {
      const subcommand = interaction.options.getSubcommand();
      // Respondo antes porque sino tarda mucho
      switch (subcommand) {
          case 'create':
              await rolesCreate.execute(interaction);
              break;
          case 'delete':
              await rolesDelete.execute(interaction);
              break;
          default:
              // Manejar comando no reconocido
              break;
      }
  }
}