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

function generateRandomUser(members){
    // Hago un array de los miembros
    const selectedMembersArray = Array.from(members.values());
    // Random numero de la cantdiad de miembros elegidpos
    const randomIndex = Math.floor(Math.random() * selectedMembersArray.length);
    // Elijo uno random de esos
    const randomMember = selectedMembersArray[randomIndex];
    return randomMember;
}
function generateRandomRole(roles){
    // Hago un array de los roles
    const selectedRolesArray = Array.from(roles.values());
    // Random numero de la cantdiad de roles elegidpos
    const randomIndex = Math.floor(Math.random() * selectedRolesArray.length);
    // Elijo uno random de esos
    const randomRole = selectedRolesArray[randomIndex];
    return randomRole;
}
module.exports = { generateRandomName, generateRandomColor, generateRandomUser, generateRandomRole };