const changers = require('../../utils/changers');
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

    // Respondo antes porque sino tarda mucho
    interaction.reply({ content: 'Shuffling names!!!'});

    // Backup de los nicks de cada miembro
    const previousNicknames = {};
    members.forEach((member) => {
      previousNicknames[member.id] = member.nickname;
    });
    
        // Ejecuto el mezclador
        try {
          for (let i=0; i<quantity; i++){
            await changers.changeNicknames(members, min, max);
          }
        } catch (error) {
          console.error('Error al mezclar:', error);
          return null;
        }

    // Restaurar los nombres anteriores de los miembros
    members.forEach( async (member) => {
      const previousNickname = previousNicknames[member.id];
      try {
        await member.setNickname(previousNickname);
        console.log(`${member.user.tag} restored!`);
      } catch (error) {
        console.error(`Error restoring nickname for ${member.user.tag}: ${error.message}`);
      }
    });
  }
}