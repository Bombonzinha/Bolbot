const { PermissionsBitField } = require('discord.js');
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
    checkPermissionsAndFetchMembers,
    checkGuildPermissions,
    checkMembers
};