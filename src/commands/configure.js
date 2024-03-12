const { SlashCommandBuilder } = require('discord.js'); 
module.exports = {
    deleted: true,
    run: ({ interaction }) => { 
        const subcommandGroup = interaction.options.getSubcommandGroup();  
        const subcommand = interaction.options.getSubcommand();  

        if (subcommandGroup==='user'){
            if (subcommand === 'role'){
                interaction.reply("configuring user...");
            }
        }
    },
    data: new SlashCommandBuilder()
        .setName('configure')
        .setDescription('Config')
        .addSubcommandGroup((subcommandGroup) => subcommandGroup
                .setName('user')
                .setDescription('User Config')
                .addSubcommand((subcommand) => subcommand
                    .setName('role')
                    .setDescription('configure user role')
                    .addUserOption((option) => option
                            .setName('target-user')
                            .setDescription('Select a user')
                            .setRequired(true)
                    )
                    .addRoleOption((option) => 
                        option
                        .setName('target-role')
                        .setDescription('Select a role') 
                        .setRequired(true)
            )
        )
    )
}