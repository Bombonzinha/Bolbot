const commandHandler = require('../../handlers/commandHandler');

module.exports = async (interaction) => {
		if (!interaction.guild) {
      return interaction
        .reply({ content: "Command can only be executed in a discord server", ephemeral: true })
        .catch(() => {});
    }
    
    if (!interaction.isChatInputCommand()) return;
		const command = interaction.command;
    
		if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		} 

		try {
			await commandHandler.handleSlashCommand(interaction);
		} catch (error) {
			console.error(error);
		}
}