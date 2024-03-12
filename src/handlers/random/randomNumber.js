const { getMinMax } = require('../../utils/parameters.js');
const random = require('../../utils/random.js');
const { textFile } = require('../../utils/files.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');
    // Obtengo las opciones
    const { min, max } = await getMinMax(interaction);
   
    // Obtengo la cantidad de iteraciones elegidas en la opción
    const quantity = interaction.options.getInteger('quantity') ?? 1;
    
    // Formo la respuesta
    try {
      let randomNumbers = [];
      for (let i = 0; i < quantity; i++) {
        // Meto un numero random al array
        const randomNumber = random.generateRandomNumber(min, max);
        randomNumbers.push(`${randomNumber}`);
      }
      // Uno los numeros con -
      /* let replyString = randomNumbers.join('-'); */
      let replyString = '';
      let lineLength = 0;
      // Esto es para que no exceda el ancho de la pantalla y se vea bien en el chat
      for (let i = 0; i < randomNumbers.length; i++) {
          const number = randomNumbers[i];
          
          // Verificar si agregar el número excederá el límite de caracteres por línea
          if (lineLength + number.length >= 116) {
              // Si excede, agregar un salto de línea
              replyString += '\n';
              // Reiniciar la longitud de la línea
              lineLength = 0;
          }
          
          // Concatenar el número a la cadena de respuesta
          replyString += number;
          // Incrementar la longitud de la línea
          lineLength += number.length;
          
          // Si no es el último número, agregar un guión para separar
          if (i !== randomNumbers.length - 1) {
              // Verificar si agregar el guión excederá el límite de caracteres por línea
              if (lineLength + 1 >= 116) {
                  // Si excede, agregar un salto de línea
                  replyString += '\n';
                  // Reiniciar la longitud de la línea
                  lineLength = 0;
              }
              // Concatenar el guión
              replyString += '-';
              // Incrementar la longitud de la línea
              lineLength++;
          }
      }
      
      // Lo mando como un archivo
      let content = quantity === 1 ?
        `${quantity} number from ${min} to ${max}:` :
        `${quantity} numbers from ${min} to ${max}:`;
      interaction.reply({ content: content, files: [textFile(replyString, interaction.commandName + interaction.options.getSubcommand())] });
      console.log('Numeros insertados: ' + randomNumbers);
    } catch (error) {
      console.error('Error al generar un numero aleatorio:', error);
      return null;
    }
  }
}