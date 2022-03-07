const { Client } = require("discord.js");
module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param { Client } client 
     */
    execute(client) {
        console.log("The Kirai client is now ready");
        client.user.setActivity("Elysium as Server Bot", {type: "WATCHING"});
    }
}