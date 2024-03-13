
module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();

    // Obtener roles
    const roles = guild.roles.cache;
    if (!roles) {
      console.error('No se pudieron obtener los roles del servidor.');
      return;
    }
    // Defino qué cosas puede generar el random
    const types = ['user', 'role', 'number', 'char']; 

    // Obtener opciones
    const quantity = interaction.options.getInteger('quantity') ?? 1;

    try {
      let randomAnything = [];
      for (let i = 0; i < quantity ; i++){
        
      }
    } catch (error) {
      console.error('Error al generar cosas aleatorias:', error);
      return null;
    }

  }
}