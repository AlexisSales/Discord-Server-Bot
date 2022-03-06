const { Events } = require("../validation/eventnames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

module.exports = async (kirai) => {
    const table = new ascii("Events Loaded");

    (await PG(`${process.cwd()}/kiraievents/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await table.addRow(`${event.name || "MISSING"}` , `- Event name is either invalid or missing:  ${L[6] +  `/` + L[7]}`);
            return;
        }

        if(event.once) {
            kirai.once(event.name, (...args) => event.execute(...args, kirai));
        } else {
            kirai.on(event.name, (...args) => event.execute(...args, kirai));
        }

        await table.addRow(event.name, "+ Event Loaded")
            
    })
    console.log("Kirai Functionality");
    console.log(table.toString());
}