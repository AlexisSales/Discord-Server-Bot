const {Client, CommandInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} kirai 
     */
    async execute(interaction, kirai) {
        if(interaction.isCommand()) {
            const command = kirai.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("- An error occurred while running this command.")
            ]}) && kirai.commands.delete(interaction.commandName);

            command.execute(interaction, kirai);
        }
    }
}