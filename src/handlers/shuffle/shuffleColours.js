const changers = require('../../utils/changers');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    
    // Respondo antes porque sino tarda mucho
    interaction.reply({ content: 'Shuffling colours!!!'});

    // Creo roles temporales
    let membersRoles = await changers.newRoles(guild, members);
    
    // Obtener todos los roles editables del servidor
    const roles = guild.roles.cache.filter(role => role.editable && role.color !== 0);
    
    // Obtener opciones
    const quantity = interaction.options.getInteger('quantity') ?? 1;

    // Backup de los nicks de cada miembro
    const previousColours = {};
    roles.forEach((role) => {
      previousColours[role.id] = role.hexColor;
    });
    
    // Ejecuto el mezclador
    try {
      for (let i=0; i<quantity; i++){
        await changers.changeRolesColour(roles);
      }
    } catch (error) {
      console.error('Error al mezclar:', error);
      return null;
    }
    
    // Borro los roles temporales
    await changers.deleteRoles(membersRoles);
    // Restaurar los colores anteriores de los roles
    roles.forEach( async (role) => {
      const previousColour = previousColours[role.id];
      try {
        await role.setColor(previousColour);
        console.log(`${role.name} restored!`);
      } catch (error) {
        console.error(`Error restoring role colour for ${role.name}: ${error.message}`);
      }
    });
  }
}