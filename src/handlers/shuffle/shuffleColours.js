const { getRoles, randomRolesColour } = require('../../utils/role');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    let members = await guild.members.fetch();
    /* members = members.filter(member => !member.user.bot); */

    // Obtener todos los roles editables del servidor
    /* const roles = guild.roles.cache.filter(role => role.editable); */
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
    // Backup de los colores de cada rol, y lo seteo a 0
    const previousColours = {};
    /* roles.forEach( async (role) => */
    for (const role of roles.values()) {
      previousColours[role.id] = role.hexColor;
      try {
        await role.setColor(0);
        console.log(`Backup del color de ${role.name} y reseteado!`);
      } catch (error) {
        console.error(`No pude realizar el backup del color de ${role.name}: ${error.message}`);
      }
    };
    console.log('Todos los roles backupeados');
    
    // Ejecuto el mezclador
    try {
      for (let i=0; i<quantity; i++){
        await randomRolesColour(userRoles); // Le cambio los colores solo a los roles de los users, asi se ven todos distintos
      }
    } catch (error) {
      console.error('Error al mezclar:', error);
      return null;
    }
    interaction.editReply({ content: 'Shuffle Done! Restoring colours...', ephemeral: true});
    // Restaurar los colores anteriores de los roles
    for (const role of roles.values()) {
      const previousColour = previousColours[role.id];
      try {
        await role.setColor(previousColour);
        console.log(`Color de ${role.name} restaurado!`);
      } catch (error) {
        console.error(`No pude restaurar el color de ${role.name}: ${error.message}`);
      }
    };
    interaction.editReply({ content: 'Finished!', ephemeral: true});
    console.log('Todos los roles restaurados');
  }
}