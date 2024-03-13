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
  },
  changeRolesColour: async function changeRolesColour(roles) {
    if (roles.length === 0) {
        console.log("No hay roles editables con colores disponibles.");
        return;
    }
    // Para crea un array con todos los roles, y a cada uno le cambia el color
    const promises = roles.map( async (role) => {
      const newColor = random.generateRandomColor().hex;
        try {
            await role.setColor(newColor);
            console.log(`${role.name} to ${newColor}`);
        } catch (error) {
            console.error(`${role.name}: ${error.message}`);
        }
    });
    await Promise.all(promises);
  },
  newRoles: async function newRoles(guild, members) {
    let membersRole = [];
    // Itera sobre cada miembro
    for (const member of members.values()) {
      if (!member || !member.user) {
        console.error('Miembro no válido:', member.nickname);
        continue;
      }
      try {
          const newRole = await guild.roles.create(/* {
              data: {
                  name: `${member.user.tag}'s Role`, 
                  color: 'RANDOM', 
                  permissions: [], 
              },
              reason: 'COLOUR SHUFFLE',             NO SE POR QUÉ NO FUNCIONA
          } */);
          guild.roles.edit(newRole.id, { name: `${member.user.tag}'s Role`, color: random.generateRandomColor().hex/* , position: guild.members.me.roles.highest.position */});
          member.roles.add(newRole); 
          membersRole.push(newRole);
          console.log(`Rol creado y asignado a ${member.user.tag}`);
      } catch (error) {
          console.error(`Error al crear y asignar un rol para ${member.user.tag}: ${error}`);
      }
    };
    return membersRole;
  },
  // Eliminar los roles creados
  deleteRoles: async function deleteRoles(rolesToDelete) {
    for (const role of rolesToDelete) {
      try {
          await role.delete();
          console.log(`Rol "${role.name}" eliminado.`);
        } catch (error) {
          console.error('Error al eliminar roles:', error);
        }
    };
  }
}