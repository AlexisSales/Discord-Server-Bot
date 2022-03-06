const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "suggest",
    description: "Create a suggeestion for everyone to vote on.",
    options: [
        {
            name: "type",
            description: "Select the type.",
            required: true,
            type:"STRING",
            choices: [
                {
                    name: "Role",
                    value: "Role"
                },
                {
                    name: "Channel",
                    value: "Channel"
                },
                {
                    name: "Other",
                    value: "Other"
                }
            ]
        },
        {
            name: "name",
            description: "Provide a name for your suggestion.",
            required: true,
            type: "STRING"
        },
        {
            name: "functionality",
            description: "Describe the functionality of this suggestion.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
            .setColor("#CD98FF")
            .setDescription(`${interaction.member} has suggested a ${type}`)
            .addField("Name", `${name}`, true)
            .addField("Functionality", `${funcs}`, true)
        
        const message = await interaction.reply({embeds: [Response], fetchReply: true});
        message.react("👍");
        message.react("👎");
    }
}