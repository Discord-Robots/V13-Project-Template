const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { TOKEN } = require("./config.json");

const { promisify } = require("util");
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);

client.commands = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();

["GiveawaySys"].forEach((system) => {
  require(`../Systems/${system}`)(client);
});

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(TOKEN);
