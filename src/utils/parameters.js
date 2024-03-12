module.exports = {
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
        if (min > max) {
            interaction.reply({ content:  min + " can't be higher than "+ max +". Set a higher maximum", ephimeral: true});
        }
        return { min, max };
    }
};