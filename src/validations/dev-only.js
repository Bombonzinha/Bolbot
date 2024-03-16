module.exports = (interaction, commandObj, handler, client) => {
    if (commandObj.devOnly) {
      if (interaction.member.id !== '728074995502153739') {
        interaction.reply('This command is for the developer only');
        return true;
      }
    }
};