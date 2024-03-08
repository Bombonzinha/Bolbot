module.exports = {
    // Obtener cantidad de shuffles
    getQuantity:async function getQuantity(interaction, max = 100){
        let quantity = 1; // Valor predeterminado
        const quantityOption = interaction.options.get('quantity');
        if (quantityOption !== null) {
            quantity = await quantityOption.value;
        }
        if (quantity > max) quantity = max;
        return quantity;
    },
    // OBTIENE EL MIN Y EL MAX DE LAS OPCIONES: SI NO SE PUSO UNA, EL VALOR POR DEFECTO ESTA DEFINIDO ACÁ
    getMinMax:async function getMinMax(interaction, min = 0, max = 100){
        const minOption = interaction.options.get('min');
        const maxOption = interaction.options.get('max');
        if (minOption !== null) { 
            min = await minOption.value;
        }
        if (maxOption !== null) {
            max = await maxOption.value;
        }
        return { min, max };
    }
};