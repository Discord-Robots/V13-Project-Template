require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 131071,
  partials: [
    "CHANNEL",
    "MESSAGE",
    "GUILD_MEMBER",
    "GUILD_SCHEDULED_EVENT",
    "USER",
    "REACTION",
  ],
  presence: {
    status: "dnd",
    activities: [{ name: "slash commands", type: "LISTENING" }],
    afk: true,
  },
});
const { promisify } = require("util");
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);
const Util = require("./Utils");
const guildData = {};
let funcs;
(async () => {
  client.commands = new Collection();
  client.filters = new Collection();
  client.filtersLog = new Collection();
  client.functions = new Util();
  client.login(process.env.TOKEN);
  funcs = client.functions;
})();

["GiveawaySys"].forEach((system) => {
  require(`../Systems/${system}`)(client);
});

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii, guildData, funcs);
});
