const { Client } = require("discord.js");
module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param { Client } kirai 
     */
    execute(kirai) {
        console.log("The Kirai client is now ready");
        kirai.user.setActivity("Elysium as Server Bot", {type: "WATCHING"});
    }
}