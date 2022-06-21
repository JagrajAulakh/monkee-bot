const { Client, Intents } = require("discord.js");
const { ROASTS } = require("./roasts.js");
require("dotenv").config();

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "ping") {
		console.log("Received command: ping");
		await interaction.reply("Pong!");
	} else if (commandName === "roast") {
		console.log("Received command: roast");
		const user = interaction.options.getUser("username");
		await interaction.reply(
			`<@${interaction.options.get("username").value}> ${
				ROASTS[Math.floor(Math.random() * ROASTS.length)]
			}`
		);

	}
});

console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
