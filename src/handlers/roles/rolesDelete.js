const { getRoles, deleteRoles } = require('../../utils/role');

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
      console.log('No hay roles que eliminar');
      interaction.reply({ content: 'There are no roles to delete.'});
      return;
    }
    interaction.reply({ content: 'Deleting roles...'});
    // Borro los roles temporales
    await deleteRoles(userRoles);
    interaction.editReply({ content: 'Done!'});
    console.log('Todos los roles borrados');
  }
}