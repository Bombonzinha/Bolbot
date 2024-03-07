function generateRandomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const max=20;
    const nameLength = Math.floor(Math.random() * max) + 1; // Random length between 1 and 10 characters
    let randomName = '';
    for (let i = 0; i < nameLength; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomName;
}

function generateRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
}

module.exports = { generateRandomName, generateRandomColor };