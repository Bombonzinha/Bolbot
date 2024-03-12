const { Role } = require('discord.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');
    const guild = interaction.guild;
    if (!guild) return;

    // Obtener roles
    const roles = guild.roles.cache;
    if (!roles) {
      console.error('No se pudieron obtener los roles del servidor.');
      return;
    }
    
    // Obtener opciones
    const includeBots = interaction.options.getBoolean('bots');
    const quantity = interaction.options.getInteger('quantity') ?? 1;
    
    // Agarro a todos los roles
    let filteredRoles = roles;
    // Filtrar los roles si la opción 'bots' es false
    if (includeBots !== true) {
      filteredRoles = roles.filter(role => !role.managed);
    }

    // Formo la respuesta
    try {
      let randomRoles = [];
      for (let i=0; i<quantity; i++){
        // Meto un miembro random al array con el arroba de mención
        const randomRole = filteredRoles.random();
        if (randomRole instanceof Role) {
          randomRoles.push(`${randomRole}`);
          console.log('Rol insertado:' + randomRole.name);
        }
      }
      // Une las menciones en una sola cadena
      let mentionString = randomRoles.join(' ');
      interaction.reply({ content: mentionString});
    } catch (error) {
      console.error('Error al seleccionar un rol aleatorio:', error);
      return null;
    }
  }
};