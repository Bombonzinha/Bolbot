const { randomNicknames } = require('../../utils/user');
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

    interaction.reply({ content: 'Shuffling...'});

    // Ejecuto el mezclador
    try {
      for (let i=0; i<quantity; i++){
        await randomNicknames(members, min, max);
      }
    } catch (error) {
      console.error('Error al mezclar:', error);
      return null;
    }
    
    interaction.editReply({ content: 'Finished!'});
    console.log('Shuffle Names terminado!');
  }
}