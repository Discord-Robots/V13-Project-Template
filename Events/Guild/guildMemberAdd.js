const { Captcha } = require("captcha-canvas");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Client} client
   * @param {GuildMember} member
   */
  async execute(client, member) {
    const captcha = new Captcha();
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const captchaAttachment = new MessageAttachment(
      await captcha.png,
      "captcha.png"
    );

    const captchEmbed = new MessageEmbed()
      .setDescription("Please complete this captcha.")
      .setImage("attachment://captcha.png")
      .setColor("BLURPLE");

    const msg = await member.send({
      files: [captchaAttachment],
      embeds: [captchEmbed],
    });

    const filter = (message) => {
      if (message.author.id !== member.id) return false;

      if (message.content === captcha.text) return true;
      else member.send("Wrong Captcha.");
    };

    try {
      const response = msg.channel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"],
      });
      if (response) {
        member.roles.add("");
        member.send("You have been verified!");
      }
    } catch (error) {
      await member.send("You have not verified!");
      member.kick("Time exceeded of verification!");
    }
  },
};
