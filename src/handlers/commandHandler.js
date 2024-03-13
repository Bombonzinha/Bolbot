const randomHandler = require('./random/randomHandler');
const shuffleHandler = require('./shuffle/shuffleHandler');
const deleteHandler = require('./delete/deleteHandler');

module.exports = {
    async handleSlashCommand(interaction) {
        const commandName = interaction.commandName;
        
        switch (commandName) {
            case 'random':
                await randomHandler.handleSubCommand(interaction);
                break;
            case 'shuffle':
                await shuffleHandler.handleSubCommand(interaction);
                break;
            case 'delete':
                await deleteHandler.handleSubCommand(interaction);
                break;
            default:
                // Manejo para comandos desconocidos
                break;
        }
    }
};