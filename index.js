require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildPresences,
    ], // Your bot's intents
});

const directorio = __dirname + '/src';
new CommandHandler({
    client, // Discord.js client object | Required by default
    commandsPath: path.join(directorio, 'commands'), // The commands directory
    eventsPath: path.join(directorio, 'events'), // The events directory
    validationsPath: path.join(directorio, 'validations'), // Only works if commandsPath is provided
    testServer: '1203555765420302436', // To register guild-based commands (if it's not provided commands will be registered globally)

});

client.login(process.env.TOKEN);