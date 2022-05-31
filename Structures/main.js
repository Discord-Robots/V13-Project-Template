require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 32767,
  partials: [
    "CHANNEL",
    "USER",
    "MESSAGE",
    "REACTION",
    "GUILD_MEMBER",
    "GUILD_SCHEDULED_EVENT",
  ],
  presence: {
    status: "dnd",
    activities: [{ name: "slash commands", type: "LISTENING" }],
    afk: true,
  },
});
const Utilities = require("./Utils");
const guildData = {};

const { promisify } = require("util");
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);

client.commands = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();
client.functions = new Utilities();
const funcs = client.functions;

["GiveawaySys"].forEach((system) => {
  require(`../Systems/${system}`)(client);
});

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii, guildData, funcs);
});

client.login(process.env.TOKEN);
