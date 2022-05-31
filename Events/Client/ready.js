const { DATABASEURL, DBPANEL, BOTOWNERID } = process.env;
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
          client.guilds.cache.forEach((g) => {
            client.functions.guild(g.id, g.name);
          });
        })
        .catch((err) => {
          let str = "";
          if (!DATABASEURL) {
            str += `⛔ - No database connection! Please get your free database cluser here ${DBPANEL}`;
          }
          if (err) {
            str += `Mongoose has encountered an error, but your bot is still operational without a database.\n${err}`;
            client.users.cache
              .get(BOTOWNERID)
              .send(
                `This is a message reguarding your bot. I have encountered an error with your database. Please resolve asap.\n${err}`
              );
          }
          console.log(str);
        });
    } else return null;

    require("../../Systems/LockdownSys")(client);
    require("../../Systems/ChatFilterSys")(client);
  },
};
