const { Client, GuildMember } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {Client} client
   * @param {GuildMember} member
   */
  async execute(client, member) {
    console.log(member.user.username + "has left the server.");
  },
};
