const shuffleFull = require('./shuffleFull');
const shuffleColour = require('./shuffleColours');
const shuffleName = require('./shuffleNames');

module.exports = {
    async handleSubCommand(interaction) {
        const subcommand = interaction.options.getSubcommand();
        // Respondo antes porque sino tarda mucho
        interaction.reply({ content: 'Shuffling ' + subcommand + '!!!', ephemeral: true});
        switch (subcommand) {
            case 'full':
                await shuffleFull.execute(interaction);
                break;
            case 'colours':
                await shuffleColour.execute(interaction);
                break;
            case 'names':
                await shuffleName.execute(interaction);
                break;
            default:
                // Manejar comando no reconocido
                break;
        }
    }
}