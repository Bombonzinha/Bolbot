const fs = require('fs');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase());

    const guild = interaction.guild;
    if (!guild) return;
    
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    
    // Obtener todos los roles editables del servidor
    const roles = await guild.roles.fetch();
    
    // Hacer JSONs
    console.log('Mapeando users...');
    const membersData = members.map(member => ({
      id: member.id,
      name: member.user.tag,
      nickname: member.nickname
    }));
    console.log('Users mapeados!');
    console.log('Mapeando roles...');
    const rolesData = roles.map(role => ({
      id: role.id,
      name: role.name,
      color: role.color,
    }));
    console.log('Roles mapeados!');
    
    const guildData = {
      id: guild.id,
      name: guild.name,
      roles: rolesData, 
      users: membersData, 
    };
    
    // Guardar los json a los archivos
    console.log('Guardando datos...');

    // Este es el archivo final
    let guildsData;
    try {
      guildsData = JSON.parse(fs.readFileSync('src/data/guilds.json', 'utf8'));
    } catch (error) {
    // Si el archivo no existe o está vacío, inicializa guildsData como un array vacío
    guildsData = [];
    }
    /* Busco el server en el json: 
    - Si está lo reemplaza 
    - Si no está lo agrega */
    const existingGuildIndex = guildsData.findIndex(guild => guild.id === guildData.id);
    if (existingGuildIndex !== -1) {
      guildsData[existingGuildIndex] = guildData;
      console.log('Guild actualizado!');
    } else {
      guildsData.push(guildData);
      console.log('Guild agregado!');
    }

    // Guardar los datos actualizados en guilds.json
    fs.writeFileSync('src/data/guilds.json', JSON.stringify(guildsData, null, 2));
    console.log('Datos guardados!');
    
    interaction.reply({ content: 'Backup Done!', ephemeral: true});
    console.log('Todos los users y roles backupeados');
  }
}