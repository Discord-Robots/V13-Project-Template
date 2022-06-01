const { Client, CommandInteraction } = require("discord.js");
const glob = require("glob");
const { BOTOWNERID } = process.env;
module.exports = {
  name: "reload",
  description: "Reloads my slash commands in your server.",
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    if (!client.functions.isOwner(member.id)) {
      return interaction.reply({ content: "You cannot use this command." });
    }
    client.commands.sweep(() => true);
    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);

        if (pull.name) {
          client.commands.set(pull.name, pull);
        }
      });
      return interaction.reply({
        content: "Commmands Reloaded...",
        ephemeral: true,
      });
    });
  },
};
