const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/LockDown");
const ms = require("ms");

module.exports = {
  name: "lockdown",
  description: "Lockdown this guild",
  permission: "MANAGE_SERVER",
  options: [
    {
      name: "time",
      description: "Expire date for this lockdown (1m, 1h, 1d)",
      type: "STRING",
    },
    {
      name: "reason",
      description: "Provide a reason for this lockdown.",
      type: "STRING",
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, channel, options } = interaction;
    interaction.reply({content: "This command is still in the works. Please wait! I will let you know when it can be used. 😁"})
  }
}