const shufflers = require('./shufflers.js');
const generators = require('./generators.js');
const commandNames = require('./utils/commands.js');

// SHUFFLERS
async function selectShuffle(interaction){
    const commandName = interaction.commandName;
    switch (commandName) {
        case commandNames.shuffle:
            await shufflers.fullShuffle(interaction);
            break;
        case commandNames.shufflename:
            await shufflers.nameShuffle(interaction);
            break;
        case commandNames.shufflecolour:
            await shufflers.colourShuffle(interaction);
            break;
        default:
            break;
    }
}
// RANDOM GENERATORS
async function selectRandom(interaction){
    const commandName = interaction.commandName;
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