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
		(match = msg.content.match("(^[iI]'?[mM]\\s)|(\\s[iI]'?[mM]\\s)"))
	) {
		// Find where the regex matched (it'll get the starting of the match) and add
		// length of matched term. That will start the substr from after "I'm"
		const everythingElse = msg.content.substring(
			match.index + match[0].length
		);
		msg.reply(`Hi ${everythingElse}, ${Math.random()>0.5?"I'm":"myself"} Monkee Bot!`);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) {
		console.log(interaction);
		return;
	}

	const { commandName } = interaction;

	if (commandName === "ping") {
		await interaction.deferReply({ ephemeral: true });
		const ping = Date.now() - interaction.createdTimestamp;
		console.log(`Ping: ${ping}ms`);
		await interaction.editReply({
			embeds: [
				{
					type: "rich",
					title: "Pong!",
					description: `Response Time: ${ping}ms`,
					color: 0x00ff00,
				},
			],
		});
	} else if (commandName === "roast") {
		await interaction.deferReply();
		const user = interaction.options.getUser("username");
		console.log("Hitting the roast API :flushed:");
		fetch("https://insult.mattbas.org/api/en/insult.json")
			.then((resp) => {
				return resp.json();
			})
			.then(async (data) => {
				console.log(`Roasting ${user.tag}`);
				await interaction.editReply({
					content: `${user} ${data.insult}`,
				});
				// await interaction.editReply({
				// 	content: `${user} ${
				// 		ROASTS[Math.floor(Math.random() * ROASTS.length)]
				// 	}`,
				// });
			})
			.catch(async (err) => {
				console.error(err);
				await interaction.editReply("Could not reach the roast API");
			});
	} else if (commandName === "snap") {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.member.permissions.has("ADMINISTRATOR")) {
			interaction.channel
				.bulkDelete(interaction.options.getInteger("n"))
				.then(async () => {
					await interaction.editReply({ content: "Done!" });
				})
				.catch(async () => {
					await interaction.editReply(
						"Permission denied! Cannot delete messages in this channel"
					);
				});
		} else {
			await interaction.editReply({
				content: "You don't have permissions to delete messages",
			});
		}
	}
});

client.on("channelCreate", async (interaction) => {
	await interaction.send("First");
});

console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
