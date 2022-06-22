const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const { DISCORD_BOT_CLIENT_ID, DISCORD_BOT_TOKEN } = process.env;

const commands = [
	{
		name: "ping",
		description: "Replies with pong!",
	},
	{
		name: "roast",
		description: "Roast a mf in the chat",
		options: [
			{
				type: 6,
				name: "username",
				description: "Username of the mf you want to roast",
				required: true,
			},
		],
	},
	{
		name: "snap",
		description: "Thanos snap the last `n` messages in this channel",
		options: [
			{
				type: 4,
				name: "n",
				description: "Number of messages",
				required: true,
			},
		],
	},
];

const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(DISCORD_BOT_CLIENT_ID), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
