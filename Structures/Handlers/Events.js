const { Events } = require("../Validations/EventNames");

module.exports = async (client, PG, Ascii, guildData, funcs) => {
  const Table = new Ascii("Events Loaded");

  (await PG(`${process.cwd().replace(/\\/g, "/")}/Events/*/*.js`)).map(
    async (file) => {
      const event = require(file);

      if (event.name) {
        if (!Events.includes(event.name))
          return Table.addRow(
            file.split("/")[7],
            "🔸 FAILED",
            "Event name is missing."
          );
      }

      if (event.once)
        client.once(event.name, (...args) =>
          event.execute(...args, client, guildData, funcs)
        );
      else
        client.on(event.name, (...args) =>
          event.execute(...args, client, guildData, funcs)
        );

      await Table.addRow(event.name, "🔹 SUCCESSFUL");
    }
  );

  console.log(Table.toString());
};
