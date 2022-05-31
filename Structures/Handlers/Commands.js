const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii, guildData, funcs) => {
  const Table = new Ascii("Commands Loaded");

  let CommandsArray = [];

  (await PG(`${process.cwd().replace(/\\/g, "/")}/Commands/**/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name)
        return Table.addRow(
          `At ${file.split("/")[7]}`,
          "🔸 FAILED",
          `missing a name.`
        );

      if (!command.type && !command.description)
        return Table.addRow(
          command.name,
          "🔸 FAILED",
          "missing a description."
        );

      client.commands.set(command.name, command);
      CommandsArray.push(command);

      await Table.addRow(command.name, "🔹 SUCCESSFUL");
    }
  );

  console.log(Table.toString());

  client.on("ready", async () => {
    client.guilds.cache.forEach((g) => {
      g.commands.set(CommandsArray);
    });
  });
};
