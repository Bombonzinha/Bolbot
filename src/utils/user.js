const random = require('./random');

module.exports = {
  randomNicknames: async function randomNicknames(members, min, max) {
    if (members.size === 0) {
      console.log("No hay miembros disponibles para cambiar el apodo.");
      return;
    }
    // Para crea un array con todos los miembros, y a cada uno le cambia el nick
    const promises = [];
    for (const member of members.values()) {
      const newName = random.generateRandomNick(min, max); // Genero nick
      try {
        const promise = await member.setNickname(newName);
        promises.push(promise);
        console.log(`${member.user.tag} cambiado a ${newName}`);
      } catch (error) {
        console.error(`${member.user.tag}: ${error.message}`);
      }
    };
    await Promise.all(promises);
  },
  setNicknames: async function setNicknames(members, membersData) {
    if (members.size === 0) {
      console.log("No hay miembros disponibles para cambiar el apodo.");
      return;
    }
    const promises = [];
    for (const member of members.values()) {
      const userData = membersData.find(data => data.id === member.id);
      if (userData) {
          try {
              if (member.nickname !== userData.nickname) {
                  const promise = await member.setNickname(userData.nickname);
                  promises.push(promise);
                  console.log(`Nickname de ${member.user.tag} restaurado: ${userData.nickname}`);
              }
          } catch (error) {
              console.error(`Error al restaurar el nickname de ${member.user.tag}: ${error.message}`);
          }
      }
  }
    await Promise.all(promises);
  }
}