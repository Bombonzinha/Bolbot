const { SlashCommandBuilder } = require('discord.js');

const integerOption = (name, description, min, max) => option => option
    .setName(name)
    .setDescription(description)
    .setMinValue(min)
    .setMaxValue(max);

const quantityOption = () => integerOption('quantity', 'How many shuffles?', 1, 100);
const minOption = () => integerOption('min', 'Minimum characters', 1, 32);
const maxOption = () => integerOption('max', 'Maximum characters', 1, 32);

const shuffleSubcommand = (name, description, includeMinMax = true) => subcommand => {
    const builder = subcommand
        .setName(name)
        .setDescription(description)
        .addIntegerOption(quantityOption());

    if (includeMinMax) {
        builder.addIntegerOption(minOption()).addIntegerOption(maxOption());
    }

    return builder;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles')
        .addSubcommand(shuffleSubcommand('full', 'Shuffles names and colours!'))
        .addSubcommand(shuffleSubcommand('names', 'Shuffles names!'))
        .addSubcommand(shuffleSubcommand('colours', 'Shuffles colours!', false))
    ,
    run: async ({ interaction }) => {

    }
}