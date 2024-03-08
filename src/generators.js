const random = require('./utils/random.js');
const checkers = require('./utils/checkers.js');
const functions = require('./utils/functions.js');
const { createCanvas, loadImage } = require('canvas');

// USER
async function user(interaction) {
    try {
        const { members } = await checkers.checkPermissionsAndFetchMembers(interaction);
        if (!members) return; 
        // Agarro a todos los miembros
        let selectedMembers = members;
        // Si la opcion es verdadera, no excluye a los bots
        const botOption = interaction.options.get('bots');
        if (botOption !== true) { // SI NO SE ELIGE LA OPCIÓN DE LOS BOTS SE FILTRAN LOS BOTS
            selectedMembers = members.filter(member => !member.user.bot);
        }
        // Obtengo la cantidad de iteraciones elegidas en la opción
        let quantity = await functions.getQuantity(interaction, 100);

        if (quantity === 1){
            // Mete los miembros en un array y elije uno random 
            const randomUser = random.generateRandomUser(selectedMembers);
            interaction.reply({ content: `${randomUser}` });
        } else {
            let randomMembers = []; // Array de miembros aleatorios
            for (let i = 0; i < quantity; i++) {
                // Meto un miembro random al array con el arroba de mención
                const randomUser = random.generateRandomUser(selectedMembers);
                randomMembers.push(`${randomUser}`);
            }
            // Une las menciones en una sola cadena
            let mentionString = randomMembers.join(' ');
            interaction.reply({ content: mentionString});
        }
    } catch (error) {
        console.error('Error al seleccionar un miembro aleatorio:', error);
        return null;
    }
}
// ROL
async function role(interaction) {
    try {
        const { guild } = await checkers.checkPermissionsAndFetchMembers(interaction);
        if (!guild) return; 

        const roles = guild.roles.cache;
        if (!roles) {
            console.error('No se pudieron obtener los roles del servidor.');
            return;
        }

        // Agarro a todos los roles
        let selectedRoles = roles;
        // Si la opcion es verdadera, no excluye a los roles de bots
        const botOption = interaction.options.get('bots');
        if (botOption !== true) { // SI NO SE ELIGE LA OPCIÓN DE LOS BOTS SE FILTRAN LOS ROLES BOTS
            selectedRoles = roles.filter(role => !role.managed);
        }
        // Obtengo la cantidad de iteraciones elegidas en la opción
        let quantity = await functions.getQuantity(interaction, 100);

        if (quantity === 1){
            // Mete los roles en un array y elije uno random 
            const randomRole = random.generateRandomRole(selectedRoles);
            interaction.reply({ content: `${randomRole}` });
        } else {
            let randomRoles = []; // Array de roles aleatorios
            for (let i = 0; i < quantity; i++) {
                // Meto un rol random al array con el arroba de mención
                const randomRole = random.generateRandomRole(selectedRoles);
                randomRoles.push(`${randomRole}`);
            }
            // Une las menciones en una sola cadena
            let mentionString = randomRoles.join(' ');
            interaction.reply({ content: mentionString });
        }
    } catch (error) {
        console.error('Error al seleccionar un rol aleatorio:', error);
        return null;
    }
}
// NUMERO
async function number(interaction) {
    try {
        const { min, max } = await functions.getMinMax(interaction);
        // Obtengo la cantidad de iteraciones elegidas en la opción
        let quantity = await functions.getQuantity(interaction);
        if (quantity === 1){
            interaction.reply({ content: `${random.generateRandomNumber(min, max)}` });
        } else {
            let randomNumbers = [];
            for (let i = 0; i < quantity; i++) {
                // Meto un numero random al array
                randomNumbers.push(`${random.generateRandomNumber(min, max)}`);
            }
            let replyString = randomNumbers.join(' - ');
            interaction.reply({ content: replyString });
        }
    } catch (error) {
        console.error('Error al generar un numero aleatorio:', error);
        return null;
    }
}
// COLOR
/* async function colour(interaction, quantity){
    const colorObj = random.generateRandomColor();
    const colorInfo = `RGB: ${colorObj.rgb.join(', ')}\nHSL: ${colorObj.hsl.join(', ')}\nHex: ${colorObj.hex}`;
    const colorImageBuffer = colorObj.image();

    interaction.reply({
        content: colorInfo,
        files: [{
            attachment: colorImageBuffer,
            name: 'color.png'
        }]
    });
} */
async function colour(interaction) {
    try {
        let quantity = await functions.getQuantity(interaction, 19); // Maximo 19
        const canvasWidth = 100 * quantity; // Ancho del lienzo para los colores
        const canvasHeight = 100; // Alto del lienzo para los colores

        // Crear un lienzo para los colores
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        // Array para almacenar la información de cada color
        const colors = [];

        // Generar colores y dibujarlos en el lienzo
        for (let i = 0; i < quantity; i++) {
            const colorObj = random.generateRandomColor();
            const colorImageBuffer = colorObj.image();
            const xOffset = i * 100; // Desplazamiento horizontal para cada color

            // Dibujar la imagen del color en el lienzo
            const colorImage = await loadImage(colorImageBuffer);
            ctx.drawImage(colorImage, xOffset, 0);

            // Almacenar la información del color
            colors.push(colorObj.info());
        }

        // Convertir el lienzo a un buffer de imagen
        const colorCanvasBuffer = canvas.toBuffer();

        // Unir la información de los colores en una sola cadena
        const colorInfo = colors.join('\n\n');
        const colorInfoCodeBlock = "```\n" + colorInfo + "\n```";

        // Responder con la información y la imagen de los colores
        interaction.reply({
            content: colorInfoCodeBlock,
            files: [{
                attachment: colorCanvasBuffer,
                name: 'colors.png'
            }]
        });
    } catch (error) {
        console.error('Error al generar colores aleatorios:', error.message);
        return null;
    }
}
module.exports = {
    user,
    role,
    number,
    colour
};