const { Colour, Char } = require('../models');

module.exports = {
    generateRandomNick: function generateRandomNick(min = 1, max = 32) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (max > 32) max=32; // ES EL MAXIMO QUE PERMITE DISCORD
        const nameLength = this.generateRandomNumber(min, max); // Random length between 1 and 10 characters
        let randomName = '';
        for (let i = 0; i < nameLength; i++) {
            randomName += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomName;
    },

    generateRandomColor: function generateRandomColor() {
        return new Colour();
    },

    generateRandomNumber: function generateRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateRandomChar: function generateRandomChar(type){
        const randomChar = new Char();
        switch (type) {
            case 'char': return randomChar.char;
            break;
            case 'lowercase': return randomChar.lowercase;
            break;
            case 'uppercase': return randomChar.uppercase;
            break;
            case 'number': return randomChar.number;
            break;
            case 'special': return randomChar.special;
            break;
            case 'letter': return Math.random() < 0.5 ? randomChar.lowercase : randomChar.uppercase;
            break;
            default:
            break;
        }
    },
    generateRandomUser: function generateRandomUser(members){
        // Hago un array de los miembros
        const selectedMembersArray = Array.from(members.values());
        // Random numero de la cantdiad de miembros elegidpos
        const randomIndex = Math.floor(Math.random() * selectedMembersArray.length);
        // Elijo uno random de esos
        const randomMember = selectedMembersArray[randomIndex];
        return randomMember;
    },
    generateRandomRole: function generateRandomRole(roles){
        // Hago un array de los roles
        const selectedRolesArray = Array.from(roles.values());
        // Random numero de la cantdiad de roles elegidpos
        const randomIndex = Math.floor(Math.random() * selectedRolesArray.length);
        // Elijo uno random de esos
        const randomRole = selectedRolesArray[randomIndex];
        return randomRole;
    }
};