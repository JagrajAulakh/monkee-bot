const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const { DISCORD_BOT_CLIENT_ID, DISCORD_BOT_GUILD_ID, DISCORD_BOT_TOKEN} = process.env;

console.log(DISCORD_BOT_CLIENT_ID, DISCORD_BOT_GUILD_ID, DISCORD_BOT_TOKEN);

const commands = [
	{
		"name": 'ping',
		"description": 'Replies with pong!',
	},
	{
		"name": "joe",
		"description": "joe",
		"options": [
			{
				"type": 3,
				"name": "input",
				"description": "input",
				"required": true
			}
		]
	}
]

const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(DISCORD_BOT_CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

