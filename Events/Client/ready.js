const { DATABASEURL, DBPANEL } = process.env;
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const db = require("../../Structures/Schemas/Guild");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log("🟢 - Logged into Discord as " + client.user.tag);

    if (DATABASEURL) {
      mongoose
        .connect(DATABASEURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("🟢 - The client is now connected to the database!");
        })
        .catch(() => {
          console.log(
            `⛔ - No database connection! Please get your free database cluser here ${DBPANEL}`
          );
        });
    } else return null;

    require("../../Systems/LockdownSys")(client);
    require("../../Systems/ChatFilterSys")(client);
    client.guilds.cache.forEach((g) => {
      client.functions.guild(g.id, g.name);
    });
  },
};
