const { MessageActionRow, MessageSelectMenu, MessageEmbed, CommandInteraction } = require("discord.js");
const role = require("./roles.json");

module.exports = {
    name: "dropdown",
    description: "testing the dropdown menu",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "type",
            description: "type of roles",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "colors",
                    value: "colors"
                },
                {
                    name: "games",
                    value: "games"
                },
                {
                    name: "platforms",
                    value: "platforms"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {  
        const choices = interaction.options.getString("type");
        const options = [];
        const embed = new MessageEmbed();
        switch(choices){
            case "colors":
                for (let i = 0; i < role.colors.length; i++) {
                    let color = {
                        label: role.colors[i].label,
                        value: role.colors[i].value,
                        emoji: role.colors[i].emoji
                    };
                    options[i] = color;
                }

                embed
                    .setDescription(". ⋅ ˚̣- : ✧ : – ⭒ ⊹  𝒸𝑜𝓁𝑜𝓇 𝓇𝑜𝓁𝑒𝓈  ⊹ ⭒ – : ✧ : -˚̣⋅ .")
                    .setColor("#E0D1FF");
                break;
            case "games":
                for (let i = 0; i < role.games.length; i++) {
                    let game = {
                        label: role.games[i].label,
                        value: role.games[i].value,
                        emoji: role.games[i].emoji
                    };
                    options[i] = game;
                }
                embed
                    .setDescription(". ⋅ ˚̣- : ✧ : – ⭒ ⊹  𝑔𝒶𝓂𝑒 𝓇𝑜𝓁𝑒𝓈  ⊹ ⭒ – : ✧ : -˚̣⋅ .")
                    .setColor("#E0D1FF");
                break;
            case "platforms":
                for (let i = 0; i < role.platforms.length; i++) {
                    let platform = {
                        label: role.platforms[i].label,
                        value: role.platforms[i].value,
                        emoji: role.platforms[i].emoji
                    };
                    options[i] = platform;
                }
                embed
                    .setDescription(". ⋅ ˚̣- : ✧ : – ⭒ ⊹  𝓅𝓁𝒶𝓉𝒻𝑜𝓇𝓂 𝓇𝑜𝓁𝑒𝓈  ⊹ ⭒ – : ✧ : -˚̣⋅ .")
                    .setColor("#E0D1FF");
                break;
        }
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("Roles")
                    .setPlaceholder("Select a Role")
                    .setMinValues(0)
                    .setMaxValues(options.length)
                    .addOptions(options)
                );

        interaction.reply({embeds: [embed], components: [row]});
    }
}