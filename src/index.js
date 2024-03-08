require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField } = require('discord.js');
const actions = require('./actions.js');
const commandNames = require('./utils/commands.js');
const shuffleCommands = [commandNames.shuffle, commandNames.shufflename, commandNames.shufflecolour];
const randomCommands = [commandNames.randrand, commandNames.randuser, commandNames.randrole, commandNames.randnumber, 
                        commandNames.randname, commandNames.randcolour, commandNames.randchar, commandNames.randtext];

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
    const { commandName } = interaction;

    if (shuffleCommands.includes(commandName)) {
        interaction.reply({ content: commandName.toUpperCase() + '!'});
        console.log('------------SHUFFLING------------');
        await actions.selectShuffle(interaction);
    }
    if (randomCommands.includes(commandName)) {
        console.log('------------RANDOM!------------');
        await actions.selectRandom(interaction);
    }
});

client.login(process.env.TOKEN);