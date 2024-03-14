const random = require('./random');

module.exports = {
  changeNicknames: async function changeNicknames(members, min, max) {
    if (members.size === 0) {
      console.log("No hay miembros disponibles para cambiar el apodo.");
      return;
    }
    // Para crea un array con todos los miembros, y a cada uno le cambia el nick
    const promises = members.map(async (member) => {
      const newName = random.generateRandomNick(min, max); // Genero nick
      try {
        await member.setNickname(newName);
        console.log(`${member.user.tag} to ${newName}`);
      } catch (error) {
        console.error(`${member.user.tag}: ${error.message}`);
      }
    });
    await Promise.all(promises);
  }
}