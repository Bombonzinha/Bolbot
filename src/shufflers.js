const random = require('./random.js');
const checkers = require('./checkers.js');
const functions = require('./functions.js');

// Shufflers: son los que iteran y deciden qué parametros cambiar
// Full
async function fullShuffle(interaction) {
    const { guild, members } = await checkers.checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await functions.getQuantity(interaction);
    for (let i = 0; i<quantity;i++){
        const namePromise = changeMemberNicknames(members);
        const colorPromise = changeRoleColors(guild);
        await Promise.all([namePromise, colorPromise]);
    }
}

// Nicks
async function nameShuffle(interaction) {
    const { members } = await checkers.checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await functions.getQuantity(interaction);
    for (let i=0;i<quantity;i++){
        await changeMemberNicknames(members);
    }
}
// Colores
async function colourShuffle(interaction) {
    const { guild } = await checkers.checkPermissionsAndFetchMembers(interaction);
    if (!guild) return; 
    let quantity = await functions.getQuantity(interaction);
    for (let i = 0; i<quantity;i++){
        await changeRoleColors(guild);
    }
}

// CHANGERS: SON LOS QUE CAMBIAN DIRECTAMENTE LOS PARAMETROS
// Nicks
async function changeMemberNicknames(members) {
    if (members.size === 0) {
        console.log("No hay miembros disponibles para cambiar el apodo.");
        return;
    }
    const promises = members.map(member => nameChanger(member));

    await Promise.all(promises);
}
async function nameChanger(member){
    const newName = random.generateRandomName();
    try {
        await member.setNickname(newName);
        console.log(`${member.user.tag} to ${newName}`);
    } catch (error) {
        console.error(`CAN'T CHANGE ${member.user.tag}: ${error.message}`);
    }
}
// Colores
async function changeRoleColors(guild) {
    const roles = guild.roles.cache.filter(role => role.editable && role.color !== 0);
    if (roles.length === 0) {
        console.log("No hay roles editables con colores disponibles.");
        return;
    }
    const promises = roles.map(role => colorChanger(role));

    await Promise.all(promises);
}
async function colorChanger(role){
    const newColor = random.generateRandomColor();
    try {
        await role.setColor(newColor);
        console.log(`${role.name} to ${newColor}`);
    } catch (error) {
        console.error(`CAN'T CHANGE ${role.name}: ${error.message}`);
    }
}

module.exports = {
    fullShuffle,
    nameShuffle,
    colourShuffle
};