const Guild = require("./Schemas/Guild");

module.exports = class guildData {
  constructor(client) {
    this.client = client;
  }

  async guild(guildID, guildName) {
    const guild = await Guild.findOne({
      gID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        gID: guildID,
        gName: guildName,
      });
      newData.save();
      return newData;
    } else {
      return guild;
    }
  }

  async getSetup(guildID) {
    const setup = await Guild.findOne({
      gID: guildID,
    });
    return setup;
  }

  async getPrefix(guildID) {
    const prefix = await Guild.findOne({
      gID: guildID,
    });
    return prefix.prefix;
  }

  async delGuild(guildID) {
    await Guild.findOneAndDelete({
      gID: guildID,
    });
  }
};
