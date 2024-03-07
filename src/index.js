require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField } = require('discord.js');
const actions = require('./actions.js');
const shuffleCommands = ['shuffle', 'nameshuffle', 'colourshuffle'];
const randomCommands = ['random', 'randuser', 'randrole', 'randnumber', 'randname', 'randcolour', 'randchar', 'randtext'];

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
    if (shuffleCommands.includes(interaction.commandName)) {
        interaction.reply({ content: interaction.commandName.toUpperCase() + '!'});
        console.log('------------SHUFFLING------------');
        await actions.selectShuffle(interaction);
    }
    if (randomCommands.includes(interaction.commandName)) {
        console.log('------------RANDOM!------------');
        await actions.selectRandom(interaction);
    }
});

client.login(process.env.TOKEN);