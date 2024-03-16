const { setNicknames } = require('../../utils/user');
const { setRolesColour } = require('../../utils/role');
const fs = require('fs');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase());
    
    const guild = interaction.guild;
    if (!guild) return;
    /* NO SE LE AGREGA .fetch() PORQUE ESO DEVUELVE LOS OBJETOS, 
    Y NECESITO RETORNAR UNO POR UNO EN LAS FUNCIONES SET*/
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    
    // Obtener todos los roles editables del servidor
    const roles = await guild.roles.fetch();
    await interaction.reply({ content: 'Rollbacking...'});
    
    try {
      // Leer los datos existentes del archivo si existe
      console.log('Recopilando datos...');
      const guildsData = JSON.parse(fs.readFileSync('src/data/guilds.json'));
      const guildData = guildsData.find(guildJSON => guildJSON.id === guild.id);
      
      if (!guildData) {
        console.log('Guild no encontrado.');
        interaction.editReply({ content: 'Rollback failed, guild not found'});
        return 
      }

      const membersData = guildData.users || [];
      const rolesData = guildData.roles || [];
      // Rollback users
      console.log('Realizando rollback de usuarios...');
      await setNicknames(members, membersData);
      
      // Rollback roles
      console.log('Realizando rollback de roles...');
      await setRolesColour(roles, rolesData);

      interaction.editReply({ content: 'Nicks & Roles restored!'});
      console.log('Rollback completado!');
    } catch (error) {
      console.log(error);
    }
  }
}