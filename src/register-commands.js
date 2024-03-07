require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'shuffle',
        description: 'Shuffles names and colours!',
        options: [
            {
                name: 'quantity',
                description: 'Number of shuffles',
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    },
    {
        name: 'nameshuffle',
        description: 'Shuffles names!',
        options: [
            {
                name: 'quantity',
                description: 'Number of shuffles',
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    },
    {
        name: 'colourshuffle',
        description: 'Shuffles colours!',
        options: [
            {
                name: 'quantity',
                description: 'Number of shuffles',
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    },
    {
        name: 'randuser',
        description: 'Generate random USER',
        options: [
            {
                name: 'quantity',
                description: 'Number of users',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'bots',
                description: 'Include Bots',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
                choices: [
                    {
                        name: 'Include Bots',
                        value: true
                    },
                    {
                        name: 'Exclude Bots',
                        value: false
                    }
                ]
            }
        ]
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async()=>{
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands
            }
        );
        console.log('slash commands registered correctly');
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
})();