const { Perms } = require("../validation/permissions");
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

/**
 *  @param {Client} kirai
 */
module.exports = async (kirai) => {
    const table = new ascii("Command Loaded");
    
    commandsArray = [];

    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
            return table.addRow(file.split("/")[7], "- FAILED", "Missing a name.");

        if(!command.description)
        return table.addRow(command.name, "- FAILED", "Missing a description.");

        if(command.permission) {
            if(Perms.includes(command.permission))
                command.defaultPermission = false;
            else
            return table.addRow(command.name, "- FAILED", "Permission is");
        }

        kirai.commands.set(command.name, command);
        commandsArray.push(command);

        await table.addRow(command.name, "+ Successful");
        
    });

    console.log(table.toString());

    // Permissions Check //

    kirai.on("ready", async() => {
        const mainGuild = await kirai.guilds.cache.get("310304625406246912");

        mainGuild.commands.set(commandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const commandPerms = commandsArray.find((c) => c.name === commandName).permission;
                if(!commandPerms) return null;
                
                return mainGuild.roles.cache.filter((r) => r.permissions.has(commandPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return[...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: r.id, permissions}]
            }, []);

            await mainGuild.commands.permissions.set({ fullPermissions });
        })
    })
}