// randomHandler.js

const randomUser = require('./randomUser');
const randomRole = require('./randomRole');
const randomNumber = require('./randomNumber');
const randomColour = require('./randomColour');
const randomChar = require('./randomChar');
const randomName = require('./randomName');
const randomAnything = require('./randomAnything');

module.exports = {
    async handleSubCommand(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'user':
                await randomUser.execute(interaction);
                break;
            case 'role':
                await randomRole.execute(interaction);
                break;
            case 'number':
                await randomNumber.execute(interaction);
                break;
            case 'colour':
                await randomColour.execute(interaction);
                break;
            case 'char':
                await randomChar.execute(interaction);
                break;
            case 'name':
                await randomName.execute(interaction);
                break;
            case 'random':
                await randomAnything.execute(interaction);
                break;
            default:
                // Manejar comando no reconocido
                break;
        }
    }
}