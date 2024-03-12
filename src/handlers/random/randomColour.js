const { createCanvas, loadImage } = require('canvas');
const random = require('../../utils/random.js');
const { textFile } = require('../../utils/files.js');

module.exports = {
  async execute(interaction) {
    console.log('EXECUTING: ' + interaction.commandName.toUpperCase() + ' ' + interaction.options.getSubcommand().toUpperCase() + '...');

    const quantity = interaction.options.getInteger('quantity') ?? 1;
    
    const minSquareSize = 10; // Tamaño mínimo del cuadrado
    const maxSquareSize = 100; // Tamaño máximo del cuadrado
    
    // Calcular el tamaño del cuadrado en función del mínimo y máximo tamaño
    const squareSize = Math.max(maxSquareSize-(quantity-1)*2, minSquareSize);
    
    // Calcular el ancho y alto del lienzo en función del tamaño de los cuadrados
    const canvasWidth = squareSize * quantity;
    const canvasHeight = squareSize;

    // Crear un lienzo para los colores
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    try {
      // Array para almacenar la información de cada color
      const colors = [];
      
      // Generar colores y dibujarlos en el lienzo
      for (let i = 0; i < quantity; i++) {
        const colorObj = random.generateRandomColor();
        const colorImageBuffer = colorObj.image();
        const xOffset = i * squareSize; // Desplazamiento horizontal para cada color
    
        // Dibujar la imagen del color en el lienzo con el tamaño calculado
        const colorImage = await loadImage(colorImageBuffer);
        ctx.drawImage(colorImage, xOffset, 0, squareSize, squareSize); // Se especifica el tamaño aquí
    
        // Almacenar la información del color
        colors.push(colorObj.info());
      }

      // Convertir el lienzo a un buffer de imagen
      const colorCanvasBuffer = canvas.toBuffer();

      // Unir la información de los colores en una sola cadena
      const colorInfo = colors.join('\n\n');
      /* const colorInfoCodeBlock = "```\n" + colorInfo + "\n```"; */

      // Responder con la información en archivo y la imagen de los colores
      let content = quantity === 1 ?
        `${quantity} colour` :
        `${quantity} colours`;
      interaction.reply({
          content: content,
          files: [{
              attachment: colorCanvasBuffer,
              name: 'colours.png'
          },
          textFile(colorInfo, interaction.commandName + interaction.options.getSubcommand())]
      });
    } catch (error) {
        console.error('Error al generar colores aleatorios:', error.message);
        return null;
    }
  }
};
