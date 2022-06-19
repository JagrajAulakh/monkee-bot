const { Client, Intents } = require('discord.js');
require('dotenv').config();


const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});


console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
