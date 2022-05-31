const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
  name: "status",
  description: "Displays the status of the client and database connection",
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client, guildData, funcs) {
    await interaction.reply({
      embeds: [
        {
          title: 'Bot Status',
          fields: [
            {
              name: 'Status',
              value: `\`🟢 ONLINE\` - \`${client.ws.ping}ms`
            },
            {
              name: `Database:`,
              value: `\`${switchTo(connection.readyState)}\``
            },
            {
              name: `**Uptime**:`,
              value: `<t:${parseInt(client.readyTimestamp / 1000)}:R> `
            }
          ], 
          color: 'RANDOM',
          footer: client.user.tag
        }
      ],
    });
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = `🔴 DISCONNCTED`;
      break;
    case 1:
      status = `🟢 CONNECTED`;
      break;
    case 2:
      status = `🟡 CONNECTING`;
      break;
    case 3:
      status = `🟡 DISCONNECTING`;
      break;
  }
  return status;
}
