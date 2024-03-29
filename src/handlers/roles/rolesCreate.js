const { getRoles, newRoles } = require('../../utils/role');

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
    if (userRoles.length !== 0) {
      console.log('Roles ya creados');
      interaction.reply({ content: 'Roles already created.'});
      return;
    }
    interaction.reply({ content: 'Creating roles...'});
    // Genero los roles para cada miembro
    await newRoles(guild, members);
    interaction.editReply({ content: 'Done!'});
    console.log('Todos los roles agregados');
  }
}