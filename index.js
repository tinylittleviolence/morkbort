const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');
const fs = require('fs');

dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

}

client.once('ready', () => {

    console.log('MorkBort is ready!');

});

client.on('message', async message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; //no prefix or if author is a bot, exit

    if (message.guild === null) return message.channel.send('I can\'t respond to DMs. Try to run the command in a channel I\'m active in.');
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    console.log(`picked up command: ${command}`);

    if (!client.commands.has(command)) return; //if the command doesn't exist, exit

    try {
        client.commands.get(command).execute(message, args);
    }
    catch {
        console.error(error);
        message.reply('I tried to execute that command, but couldn\'t. If the problem persists, consider reporting this as a bug!');
    }

})

client.login(process.env.TOKEN);

