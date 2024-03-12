const { GuildMember } = require('discord.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');
    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    
    // Obtener opciones
    const includeBots = interaction.options.getBoolean('bots');
    const quantity = interaction.options.getInteger('quantity') ?? 1;
    
    // Agrego todos los miembros
    let filteredMembers = members;
    // Filtrar los miembros si la opción 'bots' es false
    if (includeBots !== true) {
      filteredMembers = members.filter(member => !member.user.bot);
    }

    // Formo la respuesta
    try {
      let randomMembers = [];
      for (let i=0; i<quantity; i++){
        // Meto un miembro random al array con el arroba de mención
        const randomMember = filteredMembers.random();
        if (randomMember instanceof GuildMember) {
          randomMembers.push(`${randomMember}`);
          console.log('User insertado:' + randomMember.id);
        }
      }
      // Une las menciones en una sola cadena
      let mentionString = randomMembers.join(' ');
      interaction.reply({ content: mentionString});
    } catch (error) {
      console.error('Error al seleccionar un miembro aleatorio:', error);
      return null;
    }
  }
};