const { DATABASEURL } = require("../../Structures/config.json");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log("The client is now ready!");
    client.user.setActivity("/commands", { type: "LISTENING" });

    if (!DATABASEURL) return;
    mongoose
      .connect(DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to the database!");
      })
      .catch((err) => {
        console.log(err);
      });

    require("../../Systems/LockdownSys")(client);
    require("../../Systems/ChatFilterSys")(client);
  },
};
