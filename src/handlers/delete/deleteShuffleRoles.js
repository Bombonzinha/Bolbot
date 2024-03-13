const changers = require('../../utils/changers');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    let members = await guild.members.fetch();
    members = members.filter(member => !member.user.bot);
    
    // Obtener todos los roles editables del servidor
    const roles = guild.roles.cache.filter(role => role.editable);
    
    // Obtengo los roles temporales
    const membersRoles = await changers.getRoles(roles, members);

    // Borro los roles temporales
    await changers.deleteRoles(membersRoles);
  }
}