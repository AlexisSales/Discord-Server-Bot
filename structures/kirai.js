// Libraries
const {Client, Collection} = require("discord.js");
const auth = require('./auth.json');
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

// Constant Global Var Assignments
const kirai = new Client({intents: 14023});

kirai.commands = new Collection();
["event", "command"].forEach(handler => {
    require(`./handlers/${handler}`)(kirai, PG, ascii);
})
kirai.login(auth.KIRAI_TOKEN);