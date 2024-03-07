// Obtener cantidad de shuffles
async function getQuantity(interaction){
    let quantity = 1; // Valor predeterminado
    const quantityOption = interaction.options.get('quantity');
    if (quantityOption !== null) {
        quantity = await quantityOption.value;
    }
    return quantity;
}

module.exports = {
    getQuantity
};