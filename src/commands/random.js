const { SlashCommandBuilder } = require('discord.js');

// OPCIONES
// Opción integer
const integerOption = (name, description, min, max) => option => option
    .setName(name)
    .setDescription(description)
    .setMinValue(min)
    .setMaxValue(max);

// Opcion para bots
const botOption = () => (option) => option
  .setName('bots')
  .setDescription('Include Bots?')

// Opcion para chars
const charOption = () => option => option
    .setName('type')
    .setDescription('Character Type?')
    .addChoices(
      { name: 'Lowercase', value: 'lowercase' },
      { name: 'Uppercase', value: 'uppercase' },
      { name: 'Number', value: 'number' },
      { name: 'Special', value: 'special' },
      { name: 'Letter', value: 'letter' },
      { name: 'Char', value: 'char' }
);

// OPCIONES ESPECIFICAS
// Quantity: cuantos elementos?, 1=minimo por defecto, quantityMax
const quantityOption = (description, max) => integerOption('quantity', 'How many ' + description, 1, max);

// Para lo min y max, extreme = 'min' o 'max', min.min, min.max (o con max.)
const minmaxOption = (extreme, description, min, max) => integerOption(extreme, description, min, max);

// Constructor de comando
// nombre, descripcion, cantidad, incluye opcion de bots? incluye opciones min max (o una sola)?
const randomSubcommand = (name, description, quantityMax, includeBots = false, min = { min: -1, max: -1 }, max = { min: -1, max: -1 }) => subcommand => {
  const builder = subcommand
      .setName(name)
      .setDescription(description)
      .addIntegerOption(quantityOption(name + 's', quantityMax));

  // Si incluye minimos
  if (min.min !== -1 || min.max !== -1) {
    builder.addIntegerOption(minmaxOption('min', 'Minimum Values', min.min, min.max));
  }
  // Si incluye máximos
  if (max.min !== -1 || max.max !== -1) {
    builder.addIntegerOption(minmaxOption('max', 'Maximum values', max.min, max.max));
  }
  // Si incluye opciones de bot
  if (includeBots) {
      builder.addBooleanOption(botOption());
  }
  // Si es la opción de chars
  if (name === 'char') builder.addStringOption(charOption());

  return builder;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Random Generator')
    .addSubcommand(randomSubcommand('user', 'Generate Random User', 90, true))
    .addSubcommand(randomSubcommand('role', 'Generate Random Roles', 100, true))
    .addSubcommand(randomSubcommand('number', 'Generate Random Number', 9999, false, { min: 0, max: 999999 }, { min: 0, max: 999999 }))
    .addSubcommand(randomSubcommand('colour', 'Generate Random Colour', 100))
    .addSubcommand(randomSubcommand('char', 'Generate Random Char', 99999))
    .addSubcommand(randomSubcommand('name', 'Generate Random Name', 0, false, { min: 1, max: 20 }, { min: 1, max: 20 })) // AJUSTAR BIEN LOS QUANTITYS
    .addSubcommand(randomSubcommand('random', 'Generate Anything', 100))
  ,
  run: async ({ interaction }) => {
    
  }
}