const DATABASEURL = process.env.DATABASEURL;
const { Client } = require("discord.js");
const mongoose = require("mongoose");

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
          console.log("🟢 - Connected to the database!");
        })
        .catch((err) => {
          console.log(err);
        });
      require("../../Systems/LockdownSys")(client);
      require("../../Systems/ChatFilterSys")(client);
    } else
      console.log(
        "⛔ - No database connection string found. Please set in .env file as DATABASEURL"
      );
  },
};
