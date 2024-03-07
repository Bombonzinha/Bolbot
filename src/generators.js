const random = require('./random.js');
const checkers = require('./checkers.js');
const functions = require('./functions.js');

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
        let quantity = await functions.getQuantity(interaction);

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
            interaction.reply({ content: mentionString });
        }
    } catch (error) {
        console.error('Error al seleccionar un miembro aleatorio:', error);
        return null;
    }
}

module.exports = {
    user
};