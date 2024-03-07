require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField } = require('discord.js');
const random = require('./random.js');
const actions = require('./actions.js');

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
    const shuffleCommands = ['shuffle', 'nameshuffle', 'colourshuffle'];
    if (shuffleCommands.includes(interaction.commandName)) {
        interaction.reply({ content: interaction.commandName.toUpperCase() + '!'});
        console.log('------------SHUFFLING------------');
        actions.shuffle(interaction);
    }
});

client.login(process.env.TOKEN);