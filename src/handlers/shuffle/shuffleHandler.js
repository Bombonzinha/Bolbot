const shuffleFull = require('./shuffleFull');
const shuffleColours = require('./shuffleColours');
const shuffleNames = require('./shuffleNames');

module.exports = {
    async handleSubCommand(interaction) {
        const subcommand = interaction.options.getSubcommand();
        // Respondo antes porque sino tarda mucho
        switch (subcommand) {
            case 'full':
                await shuffleFull.execute(interaction);
                break;
            case 'colours':
                await shuffleColours.execute(interaction);
                break;
            case 'names':
                await shuffleNames.execute(interaction);
                break;
            default:
                // Manejar comando no reconocido
                break;
        }
    }
}