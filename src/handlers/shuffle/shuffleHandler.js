// randomHandler.js

const shuffleFull = require('./shuffleFull');
const shuffleColour = require('./shuffleColour');
const shuffleName = require('./shuffleName');

module.exports = {
    async handleSubCommand(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'full':
                await shuffleFull.execute(interaction);
                break;
            case 'colour':
                await shuffleColour.execute(interaction);
                break;
            case 'name':
                await shuffleName.execute(interaction);
                break;
            default:
                // Manejar comando no reconocido
                break;
        }
    }
}