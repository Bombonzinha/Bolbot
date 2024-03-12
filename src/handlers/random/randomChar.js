const random = require('../../utils/random.js');
const { textFile  } = require('../../utils/files.js');

module.exports = {
  async execute(interaction){
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');
    
    const quantity = interaction.options.getInteger('quantity') ?? 1;
    const option = interaction.options.get('type');
    const optionValue = option ? option.value : 'char';

    // Formo la respuesta
    try {
        let chars = '';
        for(let i = 0 ; i < (quantity || 1); i++){
            const randomChar = random.generateRandomChar(optionValue);
            chars += randomChar;
        }
        console.log('Caracteres insertados: ' + chars);

        let replyString = '';
        let lineLength = 0;
        // Esto es para que no exceda el ancho de la pantalla y se vea bien en el chat
        for (let i = 0; i < chars.length; i++) {
            // Verificar si agregar un caracter excederá el límite de caracteres por línea
            if (lineLength + 1 >= 116) {
                // Si excede, agregar un salto de línea
                replyString += '\n';
                // Reiniciar la longitud de la línea
                lineLength = 0;
            }
            // Concatenar el caracter
            replyString += chars.charAt(i);
            // Incrementar la longitud de la línea
            lineLength++;
        }

        let content = quantity === 1 ?
          `${quantity} character` :
          `${quantity} characters`;
        interaction.reply({ content: content, files:[textFile(replyString, interaction.commandName + interaction.options.getSubcommand())]});
    } catch (error) {
        console.error('Error generating random characters:', error);
    }
  }
}