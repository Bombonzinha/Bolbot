const random = require('./random');

module.exports = {
  // Le asigna colores aleatorios a los roles
  randomRolesColour: async function randomRolesColour(roles) {
    if (roles.length === 0) {
        console.log("No hay roles editables con colores disponibles.");
        return;
    }
    // Crea un array con todos los roles, y a cada uno le cambia el color
    const promises = roles.map( async (role) => {
      const newColor = random.generateRandomColor().hex;
      try {
          await role.setColor(newColor);
          console.log(`${role.name} cambiado a:${newColor}`);
      } catch (error) {
          console.error(`${role.name}: ${error.message}`);
      }
    });
    await Promise.all(promises);
  },
  // Le asigna un color a los roles HAY QUE DEFINIR EL ARRAY DE COLORES
  setRolesColour: async function setRolesColour(roles, colours) {
    if (roles.length === 0) {
        console.log("No hay roles editables con colores disponibles.");
        return;
    }
    // Crea un array con todos los roles, y a cada uno le cambia el color
    const promises = roles.map( async (role) => {
      try {
        await role.setColor(colours);
          console.log(`${role.name} to ${colours}`);
      } catch (error) {
          console.error(`${role.name}: ${error.message}`);
      }
    });
    await Promise.all(promises);
  },
  newRoles: async function newRoles(guild, members) {
    // Itera sobre cada miembro
    for (const member of members.values()) {
      try {
        // Verificar si ya existe un rol con el mismo nombre
        const existingRole = guild.roles.cache.find(role => role.name === `${member.user.tag}'s Role`);
        if (existingRole) {
            member.roles.add(existingRole); // le asigna el rol
            console.log(`Rol ${existingRole.name} asignado`);
        } else {
          const newRole = await guild.roles.create(/* {
              data: {
                  name: `${member.user.tag}'s Role`, 
                  color: 'RANDOM', 
                  permissions: [], 
              },
              reason: 'COLOUR SHUFFLE',             NO SE POR QUÉ NO FUNCIONA
          } */);
          await newRole.setName(`${member.user.tag}'s Role`)
          member.roles.add(newRole); // le asigna el rol
          console.log(`Rol ${newRole.name} creado y asignado`);
        }
      } catch (error) {
          console.error(`Error al crear y asignar un rol para ${member.user.tag}: ${error}`);
      }
    };
  },
  getRoles: async function getRoles(roles, members) {
    let userRoles = [];
    // Para cada miembro, busca el rol que tenga 
    for (const member of members.values())  {
      for (const role of roles.values()) {
        if (role.name === `${member.user.tag}'s Role`) {
          userRoles.push(role);
          console.log(`${role.name} obtenido`);
          break;
        }
      }
    }

    return userRoles;
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