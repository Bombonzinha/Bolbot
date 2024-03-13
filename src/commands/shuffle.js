const { SlashCommandBuilder } = require('discord.js');

// OPCIONES
// Opción integer
const integerOption = (name, description, min, max) => option => option
    .setName(name)
    .setDescription(description)
    .setMinValue(min)
    .setMaxValue(max);

// OPCIONES ESPECIFICAS
// Quantity: cuantos elementos?, 1=minimo por defecto, quantityMax
const quantityOption = (description, max) => integerOption('quantity', 'How many ' + description, 1, max);

// Para lo min y max, extreme = 'min' o 'max', min.min, min.max (o con max.)
const minmaxOption = (extreme, description, min, max) => integerOption(extreme, description, min, max);

// Constructor de comando
// nombre, descripcion, cantidad, incluye opcion de bots? incluye opciones min max (o una sola)?
const shuffleSubcommand = (name, description, quantityMax, min = { min: -1, max: -1 }, max = { min: -1, max: -1 }) => subcommand => {
    const builder = subcommand
        .setName(name)
        .setDescription(description)
        .addIntegerOption(quantityOption('shuffles', quantityMax));

    // Si incluye minimos
    if (min.min !== -1 || min.max !== -1) {
        builder.addIntegerOption(minmaxOption('min', 'Minimum nick nength', min.min, min.max));
    }
    // Si incluye máximos
    if (max.min !== -1 || max.max !== -1) {
        builder.addIntegerOption(minmaxOption('max', 'Maximum nick length', max.min, max.max));
    }

    return builder;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles')
        .addSubcommand(shuffleSubcommand('full', 'Shuffles names and colours!', 100, { min: 1, max: 32 }, { min: 1, max: 32 }))
        .addSubcommand(shuffleSubcommand('names', 'Shuffles names!', 100, { min: 1, max: 32 }, { min: 1, max: 32 }))
        .addSubcommand(shuffleSubcommand('colours', 'Shuffles colours!', 100))
    ,
    run: async ({ interaction }) => {

    }
}