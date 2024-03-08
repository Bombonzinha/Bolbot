require('dotenv').config();
const commandNames = require('./utils/commands.js');
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: commandNames.shuffle,
        description: 'Shuffles names and colours!',
        options: [
            {
                name: 'quantity',
                description: 'Number of shuffles',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'minchar',
                description: 'Minimum characters DEFAULT = 1',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'maxchar',
                description: 'Maximum characters DEFAULT & MAX = 32',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
        ]
    },
    {
        name: commandNames.shufflename,
        description: 'Shuffles names!',
        options: [
            {
                name: 'quantity',
                description: 'Number of shuffles',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'min',
                description: 'Minimum characters DEFAULT = 1',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'max',
                description: 'Maximum characters DEFAULT & MAX = 32',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
        ]
    },
    {
        name: commandNames.shufflecolour,
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
        name: commandNames.randuser,
        description: 'Generate random USER',
        options: [
            {
                name: 'quantity',
                description: 'Number of users MAX = 100',
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
    },
    {
        name: commandNames.randrole,
        description: 'Generate random ROLE',
        options: [
            {
                name: 'quantity',
                description: 'Number of roles MAX = 100',
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
    },
    {
        name: commandNames.randnumber,
        description: 'Generate random NUMBER',
        options: [
            {
                name: 'quantity',
                description: 'Numbers',
                type: ApplicationCommandOptionType.Number,
                required: false
            },
            {
                name: 'min',
                description: 'Minimum values DEFAULT = 0',
                type: ApplicationCommandOptionType.Number,
                required: false,
            },
            {
                name: 'max',
                description: 'Maximum values DEFAULT = 100',
                type: ApplicationCommandOptionType.Number,
                required: false,
            }
        ]
    },
    {
        name: commandNames.randcolour,
        description: 'Generate random COLOUR',
        options: [
            {
                name: 'quantity',
                description: 'Number of colours MAX = 19',
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    },
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