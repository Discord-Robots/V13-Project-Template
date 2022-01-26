const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description:
    "Deletes a specified number of messages from a channel or a target.",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description:
        "Select the amount of messages to delete from a channel or a target.",
      type: "NUMBER",
      required: true,
    },
    {
      name: "target",
      description: "Select a target to clear their messages.",
      type: "USER",
      required: false,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;

    const Amount = options.getNumber("amount");
    const target = options.getMember("target");

    const Messages = await channel.messages.fetch();

    const Response = new MessageEmbed().setColor("AQUA");

    if (target) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === target.id && Amount > i) {
          filtered.push(m);
          i++;
        }
      });

      await channel.bulkDelete(filtered, true).then((messages) => {
        Response.setDescription(
          `🧹 Cleared \`${messages.size}\` from ${target}.`
        );
        return interaction
          .reply({
            embeds: [Response],
          })
          .then((m) => {
            setTimeout(() => {
              m.delete().catch((err) => {
                console.log("Regular Error. Couldn't Delete the Clear Embed.");
              });
            }, 2 * 1000);
          });
      });
    } else {
      await channel.bulkDelete(Amount, true).then((messages) => {
        Response.setDescription(
          `🧹 Cleared \`${messages.size}\` from this channel.`
        );
        return interaction
          .reply({
            embeds: [Response],
            fetchReply: true,
          })
          .then((m) => {
            setTimeout(() => {
              m.delete().catch((err) => {
                console.log("Regular Error. Couldn't Delete the Clear Embed.");
              });
            }, 2 * 1000);
          });
      });
    }
  },
};
