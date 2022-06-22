const { Client, Intents } = require("discord.js");
const { ROASTS } = require("./roasts.js");
require("dotenv").config();

const sleep = async (t) => {
	return new Promise((resolve) => setTimeout(resolve, t));
};

// Delcare all intents that the bot has
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
	let match;
	if (
		msg.author.id !== client.user.id &&
		(match = msg.content.match("[iI]'?[mM]\\s"))
	) {
		// Find where the regex matched (it'll get the starting of the match) and add
		// length of matched term. That will start the substr from after "I'm"
		const everythingElse = msg.content.substring(
			match.index + match[0].length
		);
		msg.channel.send(`Hi ${everythingElse}, I'm Monkee Bot!`);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) {
		console.log(interaction);
		return;
	}

	const { commandName } = interaction;

	if (commandName === "ping") {
		await interaction.deferReply();
		console.log("Received command: ping");
		await interaction.editReply({ content: "Pong!" });
	} else if (commandName === "roast") {
		await interaction.deferReply();
		const user = interaction.options.getUser("username");
		console.log(`Roasting ${user.tag}`);
		await interaction.editReply({
			content: `${user} ${
				ROASTS[Math.floor(Math.random() * ROASTS.length)]
			}`,
		});
	}
});

client.on("channelCreate", async (interaction) => {
	await interaction.send("First");
});

console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
