// Libraries
const {Client, Collection} = require("discord.js");
const auth = require('./auth.json');
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

// Constant Global Var Assignments
const client = new Client({intents: 14023});

client.commands = new Collection();
["event", "command"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, ascii);
})
client.login(auth.KIRAI_TOKEN);