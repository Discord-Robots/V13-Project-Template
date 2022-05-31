const { Client, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async execute(client, member) {
        console.log(member.user.username + "has left the server.")
        let guild = client.guilds.cache.get(member.guild.id)
        // Use either channel to send the message, comment out the one you don't use
        let channel = guild.channels.cache.find(ch => ch.name == "")
        let channel = guild.channels.cache.get()
        channel.send(member.user.tag + "left the server")

    }
}

