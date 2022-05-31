const { Message, MessageEmbed, Client } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.author.bot) return;

    // await DB.deleteOne({GuildID: message.guild.id, UserID: message.author.id});
    let mentioned = message.mentions.members;
    if (mentioned.size) {
      const Embed = new MessageEmbed()
        .setColor("RED")
        .setFooter({ text: `${client.user.username}'s AFK System` });
      mentioned.forEach((m) => {
        DB.findOne({ GuildID: m.guild.id, UserID: m.id }, async (err, data) => {
          if (err) throw err;
          if (data)
            return message.reply({
              embeds: [
                Embed.setDescription(
                  `${m} went AFK <t:${data.Time}:R>\n **Status**: ${data.Status}`
                ),
              ],
            });
        });
      });
    }
  },
};
