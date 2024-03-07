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
        interaction.reply({ content: 'SHUFFLE!'});
        
        /* const interval = 2000; // 2 SEG
        let intervalId;
        intervalId = setInterval(async () => {
            await actions.fullShuffle(interaction);
        }, interval);
        
        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Finished Shuffling!');
        }, 10000); // 10 SEG */

        await actions.shuffle(interaction);
        console.log('Finished Shuffling!');
    }
});

client.login(process.env.TOKEN);