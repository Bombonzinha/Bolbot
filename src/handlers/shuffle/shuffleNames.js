const { changeNicknames } = require('../../utils/user');
const { getMinMax } = require('../../utils/parameters.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    
    // Obtengo las opciones
    const { min, max } = await getMinMax(interaction, 1); // Le asigno 1 porque es el minimo de caracteres para shufflear

    // Obtener opciones
    const quantity = interaction.options.getInteger('quantity') ?? 1;

    interaction.reply({ content: 'Shuffling...', ephemeral: true});

    // Backup de los nicks de cada miembro
    const previousNicknames = {};
    for (const member of members.values()) {
      previousNicknames[member.id] = member.nickname;
    };
    console.log('Todos los nicks backupeados');
    
    // Ejecuto el mezclador
    try {
      for (let i=0; i<quantity; i++){
        await changeNicknames(members, min, max);
      }
    } catch (error) {
      console.error('Error al mezclar:', error);
      return null;
    }

    interaction.editReply({ content: 'Shuffle Done! Restoring names...', ephemeral: true});
      
    // Restaurar los nombres anteriores de los miembros
    for (const member of members.values()) {
      const previousNickname = previousNicknames[member.id];
      try {
        await member.setNickname(previousNickname);
        console.log(`Nick de ${member.user.tag} restaurado!`);
      } catch (error) {
        console.error(`Error al restaurar el nick de ${member.user.tag}: ${error.message}`);
      }
    };
    interaction.editReply({ content: 'Finished!', ephemeral: true});
    console.log('Todos los nombres restaurados');
  }
}