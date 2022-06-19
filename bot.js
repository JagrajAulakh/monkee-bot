const { Client, Intents } = require('discord.js');
require('dotenv').config();


const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});




console.log(`TOKEN: ${process.env.DISCORD_BOT_TOKEN}`);
client.login(process.env.DISCORD_BOT_TOKEN);
