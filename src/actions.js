const shufflers = require('./shufflers.js');
const generators = require('./generators.js');
// SHUFFLERS
async function selectShuffle(interaction){
    const commandName = interaction.commandName;
    switch (commandName) {
        case 'shuffle':
            await shufflers.fullShuffle(interaction);
            break;
        case 'nameshuffle':
            await shufflers.nameShuffle(interaction);
            break;
        case 'colourshuffle':
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
        case 'random':
            await generators.random(interaction);
            break;
        case 'randuser':
            await generators.user(interaction);
            break;
        case 'randrole':
            await generators.role(interaction);
            break;
        case 'randnumber':
            await generators.number(interaction);
            break;
        case 'randname':
            await generators.name(interaction);
            break;
        case 'randcolour':
            await generators.colour(interaction);
            break;
        case 'randchar':
            await generators.char(interaction);
            break;
        case 'randtext':
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