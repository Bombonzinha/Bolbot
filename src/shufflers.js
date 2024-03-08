const random = require('./utils/random.js');
const checkers = require('./utils/checkers.js');
const functions = require('./utils/functions.js');
const { PermissionsBitField } = require('discord.js');

// Shufflers: son los que iteran y deciden qué parametros cambiar
// Full
async function fullShuffle(interaction) {
    const { guild, members } = await checkers.checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await functions.getQuantity(interaction);
    // SI SE ELIGIERON OPCIONES, ACA SE OBTIENEN LOS MIN Y MAX. SINO, SE UNA 1 MIN Y MAX 20 POR DEFECTO
    const { min, max } = await functions.getMinMax(interaction, 1, 20);
    for (let i = 0; i<quantity;i++){
        const namePromise = changeMemberNicknames(members, min, max);
        const colorPromise = changeRoleColors(guild);
        await Promise.all([namePromise, colorPromise]);
    }
}

// Nicks
async function nameShuffle(interaction) {
    const { members } = await checkers.checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await functions.getQuantity(interaction);
    // SI SE ELIGIERON OPCIONES, ACA SE OBTIENEN LOS MIN Y MAX. SINO, SE UNA 1 MIN Y MAX 20 POR DEFECTO
    const { min, max } = await functions.getMinMax(interaction, 1, 20);
    for (let i=0;i<quantity;i++){
        await changeMemberNicknames(members, min, max);
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
async function changeMemberNicknames(members, min, max) {
    if (members.size === 0) {
        console.log("No hay miembros disponibles para cambiar el apodo.");
        return;
    }
    const promises = members.map(member => nameChanger(member, min, max));

    await Promise.all(promises);
}
// Cambia el nombre generando un nombre random con min y max
async function nameChanger(member, min, max){
    const newName = random.generateRandomNick(min, max);
    try {
        await member.setNickname(newName);
        console.log(`${member.user.tag} to ${newName}`);
    } catch (error) {
        console.error(`${member.user.tag}: ${error.message}`);
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
    const newColor = random.generateRandomColor().hex;
    try {
        await role.setColor(newColor);
        console.log(`${role.name} to ${newColor}`);
    } catch (error) {
        console.error(`${role.name}: ${error.message}`);
    }
}

module.exports = {
    fullShuffle,
    nameShuffle,
    colourShuffle
};