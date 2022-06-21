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
	if (!interaction.isCommand()) {
		console.log(interaction);
		return;
	}

	const { commandName } = interaction;

	if (commandName === "ping") {
		console.log("Received command: ping");
		await interaction.reply("Pong!");
	} else if (commandName === "roast") {
		const user = interaction.options.getUser("username");
		console.log(`Roasting ${user.tag}`);
		await interaction.reply(
			`${user} ${ROASTS[Math.floor(Math.random() * ROASTS.length)]}`
		);
	}
});

client.on("channelCreate", async (interaction) => {
	await interaction.send("First");
});

console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
