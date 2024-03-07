require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField } = require('discord.js');
const random = require('./random.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        /* IntentsBitField.Flags.MessageContent */
    ]
});

client.on('ready', (c)=> {
    console.log(`${c.user.tag} is online`);
});

client.on('interactionCreate', async (interaction) =>{
    if (!interaction.isChatInputCommand) return;
    
    if (interaction.commandName === 'shuffle') {
        const guild = interaction.guild;
        if (!guild.available) return;

        if (!guild.members.me.permissions.has(PermissionsBitField.Flags.ChangeNickname)) {
            return interaction.reply({ content: 'No tengo permiso para cambiar nombres de usuario.', ephemeral: true });
        } 
        let members;
        try {
            members = await guild.members.fetch();
        } catch (error) {
            console.error('Error al obtener los miembros del servidor:', error);
        }
        // Función para realizar las acciones de cambio de nombre y color de rol
        async function performActions() {
            var nopermission = '';
            for (const member of members.values()) {
                const newName = random.generateRandomName();
                try {
                    await member.setNickname(newName);
                    console.log(`El nombre de ${member.user.tag} ha sido cambiado a ${newName}`);
                } catch (error) {
                    console.error(`Error al cambiar el nombre de ${member.user.tag}: ${error.message}`);
                }
            }

            var rolepermission = '';
            const roles = guild.roles.cache.filter(role => role.editable && role.color !== 0);
            for (const role of roles.values()) {
                const newColor = random.generateRandomColor();
                try {
                    await role.setColor(newColor);
                    console.log(`El color del rol ${role.name} ha sido cambiado a ${newColor}`);
                } catch (error) {
                    console.error(`Error al cambiar el color del rol ${role.name}: ${error.message}`);
                }
            }
        }
        
        interaction.reply({ content: 'SHUFFLE!'});
        
        const interval = 2000; // 2 SEG
        let intervalId;
        intervalId = setInterval(async () => {
            await performActions();
        }, interval);
        
        setTimeout(() => {
            clearInterval(intervalId);
        }, 10000); // 10 SEG
    }
});

client.login(process.env.TOKEN);