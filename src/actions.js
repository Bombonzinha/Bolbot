const shufflers = require('./shufflers.js');
const generators = require('./generators.js');
const commandNames = require('./utils/commands.js');
const checkers = require('./utils/checkers.js');

// SHUFFLERS
async function selectShuffle(interaction){
    const { commandName, member } = interaction;
    switch (commandName) {
        // Lee el comando que ingreso
        case commandNames.shuffle:
            // Si el usuario no tiene el rol que necesita el comando, retorna fallo
            if (!checkers.isAdmin(member)) return interaction.reply({ content: '¡Denied permissions!', ephemeral: true });
            // Si lo tiene, llama a la acción
            await shufflers.fullShuffle(interaction);
            break;
        case commandNames.shufflename:
            if (!checkers.isAdmin(member)) return interaction.reply({ content: '¡Denied permissions!', ephemeral: true });
            await shufflers.nameShuffle(interaction);
            break;
        case commandNames.shufflecolour:
            if (!checkers.isAdmin(member)) return interaction.reply({ content: '¡Denied permissions!', ephemeral: true });
            await shufflers.colourShuffle(interaction);
            break;
        default:
            break;
    }
}
// RANDOM GENERATORS
async function selectRandom(interaction){
    const { commandName, member } = interaction;
    switch (commandName) {
        case commandNames.randrand:
            await generators.random(interaction);
            break;
        case commandNames.randuser:
            await generators.user(interaction);
            break;
        case commandNames.randrole:
            await generators.role(interaction);
            break;
        case commandNames.randnumber:
            await generators.number(interaction);
            break;
        case commandNames.randname:
            await generators.name(interaction);
            break;
        case commandNames.randcolour:
            await generators.colour(interaction);
            break;
        case commandNames.randchar:
            await generators.char(interaction);
            break;
        case commandNames.randtext:
            await generators.text(interaction);
            break;
        default:
            break;
    }
}

module.exports = {
    selectShuffle,
    selectRandom
};