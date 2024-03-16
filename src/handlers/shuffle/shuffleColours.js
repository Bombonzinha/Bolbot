const { getRoles, randomRolesColour } = require('../../utils/role');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    let members = await guild.members.fetch();

    // Obtener todos los roles editables del servidor
    const roles = await guild.roles.fetch();

    // Obtengo los roles de los users y verifico si aún no se crearon
    const userRoles = await getRoles(roles, members);
    if (userRoles.length === 0) {
      console.log('No hay roles que mezclar');
      interaction.reply({ content: 'There are no roles to shuffle. To add them use /roles create.', ephemeral: true});
      return;
    }

    // Obtener opciones
    const quantity = interaction.options.getInteger('quantity') ?? 1;

    interaction.reply({ content: 'Shuffling...', ephemeral: true});

    // Ejecuto el mezclador
    try {
      for (let i=0; i<quantity; i++){
        await randomRolesColour(userRoles); // Le cambio los colores solo a los roles de los users, asi se ven todos distintos
      }
    } catch (error) {
      console.error('Error al mezclar:', error);
      return null;
    }
    
    interaction.editReply({ content: 'Finished!', ephemeral: true});
  }
}