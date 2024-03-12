const random = require('../utils/random.js');

class Char {
    constructor() {
        this.chars = {
            letters: {
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            },
            numbers: '0123456789',
            specials: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        this.lowercase = this.generateLowerCase();
        this.uppercase = this.generateUpperCase();
        this.number = this.generateNumber();
        this.special = this.generateSpecial();
        this.char = this.chooseChar();
    }

    chooseChar(){
        const randomType = Math.floor(Math.random() * 4);
        switch (randomType) {
            case 0:
                return this.generateLowerCase();
            case 1:
                return this.generateUpperCase();
            case 2:
                return this.generateNumber();
            case 3:
                return this.generateSpecial();
            default:
                console.error('Tipo de caracteres no válido.');
                return null;
        }
    }

    generateLowerCase(){
        return this.chars.letters.lowercase.charAt(Math.floor(Math.random() * this.chars.letters.lowercase.length));
    }

    generateUpperCase() {
        return this.chars.letters.uppercase.charAt(Math.floor(Math.random() * this.chars.letters.uppercase.length));
    }

    generateNumber() {
        return this.chars.numbers.charAt(Math.floor(Math.random() * this.chars.numbers.length));
    }

    generateSpecial() {
        return this.chars.specials.charAt(Math.floor(Math.random() * this.chars.specials.length));
    }
   
}
module.exports = Char;


