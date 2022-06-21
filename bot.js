const { Client, Intents } = require('discord.js');
require('dotenv').config();


const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS]});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		console.log("Revieved command: ping");
		await interaction.reply('Pong!');
	}
	else if (commandName === 'joe') {
		console.log("Revieved command: joe");
		await interaction.reply('GOTEM!');
	}
});


console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
