const randomHandler = require('./random/randomHandler');
const shuffleHandler = require('./shuffle/shuffleHandler');
const rolesHandler = require('./roles/rolesHandler');
const backup = require('./backup/backup');
const rollback = require('./backup/rollback');

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
            case 'roles':
                await rolesHandler.handleSubCommand(interaction);
                break;
            case 'backup':
                await backup.execute(interaction);
                break;
            case 'rollback':
                await rollback.execute(interaction);
                break;
            default:
                // Manejo para comandos desconocidos
                break;
        }
    }
};