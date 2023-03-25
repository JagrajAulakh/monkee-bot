const { Client, GatewayIntentBits } = require("discord.js");
const { ROASTS } = require("./roasts.js");
const { badwords } = require("./badwords.js");
require("dotenv").config();

const sleep = async (t) => {
	return new Promise((resolve) => setTimeout(resolve, t));
};

const containsBadWord = (s) => {
	return badwords.some((w) => s.match(w)); // .some returns true of any element returns true
};

// Delcare all intents that the bot has
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
	const r = /i'?m\s|\si'?m\s/gi;
	if (
		msg.author.id !== client.user.id &&
		(match = msg.content.match(r)) &&
		msg.content.substring(0, 8).match(r).length < 2
	) {
		// Find where the regex matched (it'll get the starting of the match) and add
		// length of matched term. That will start the substr from after "I'm"
		const everythingElse = msg.content.substring(
			match.index + match[0].length
		);
		console.info(`Dad botting: ${msg.author.tag}. They said: ${msg}`);

		if (msg.guild.ownerId != msg.author.id) {
			msg.member.setNickname(everythingElse);
		}
		if (!containsBadWord(msg.content)) {
			msg.reply(
				`${Math.random() > 0.5 ? "Hi" : "Wassup"} ${everythingElse}, ${
					Math.random() > 0.5 ? "I'm" : "myself"
				} Monkee Bot!`
			);
		}
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
