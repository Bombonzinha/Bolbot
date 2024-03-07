const random = require('./random.js');
const { Client, IntentsBitField, PermissionsBitField } = require('discord.js');
// Algoritmos
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
// Shufflers
// Full
async function fullShuffle(interaction) {
    const { guild, members } = await checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await getQuantity(interaction);
    for (let i = 0; i<quantity;i++){
        const namePromise = changeMemberNicknames(members);
        const colorPromise = changeRoleColors(guild);
        await Promise.all([namePromise, colorPromise]);
    }
}
// Nicks
async function nameShuffle(interaction) {
    const { members } = await checkPermissionsAndFetchMembers(interaction);
    if (!members) return; 
    let quantity = await getQuantity(interaction);
    for (let i=0;i<quantity;i++){
        await changeMemberNicknames(members);
    }
}
// Colores
async function colourShuffle(interaction) {
    const { guild } = await checkPermissionsAndFetchMembers(interaction);
    if (!guild) return; 
    let quantity = await getQuantity(interaction);
    for (let i = 0; i<quantity;i++){
        await changeRoleColors(guild);
    }
}
// SELECTOR
async function selectShuffle(interaction){
    const commandName = interaction.commandName;
    switch (commandName) {
        case 'shuffle':
            await fullShuffle(interaction);
            break;
        case 'nameshuffle':
            await nameShuffle(interaction);
            break;
        case 'colourshuffle':
            await colourShuffle(interaction);
            break;
        default:
            break;
    }
}
// Obtener cantidad de shuffles
async function getQuantity(interaction){
    let quantity = 1; // Valor predeterminado
    const quantityOption = interaction.options.get('quantity');
    if (quantityOption !== null) {
        quantity = await quantityOption.value;
    }
    return quantity;
}
// Comando FINAL
async function shuffle(interaction){
    await selectShuffle(interaction);
}
// CHECKEAR PERMISOS
async function checkPermissionsAndFetchMembers(interaction) {
    // Chequea permisos de servidor
    const guild = await checkGuildPermissions(interaction);
    if (!guild) return;

    // Chequea miembros del servidor
    let members = await checkMembers(guild);

    return { guild, members };
}
async function checkGuildPermissions(interaction) {
    const guild = interaction.guild;
    if (!guild.available) return null;

    if (!guild.members.me.permissions.has(PermissionsBitField.Flags.ChangeNickname)) {
        await interaction.reply({ content: 'No tengo permiso para cambiar nombres de usuario.', ephemeral: true });
        return null;
    }

    return guild;
}
async function checkMembers(guild) {
    try {
        return await guild.members.fetch();
    } catch (error) {
        throw new Error('Error al obtener los miembros del servidor:', error);
    }
}


module.exports = {
    shuffle
};