const { prefix } = require('../config.json');
const { Lore, Games } = require('../dbObjects');
const  Discord = require('discord.js');




module.exports = {
name: 'lore',
    description: `Learn more about the horrible world. Usage: ${prefix}lore <search term>`,
    async execute(message, args) {
        //return message.channel.send ('This command isn\'t ready yet.');

        try {
        const game = await Games.findOne({ where: {channel: message.channel.id }});

        if (!game) {
            return message.channel.send('There\'s no active game in this channel.')
        }

        const players = await game.getInfo();

        const isAPlayer = players.find(players => (message.author.id));

        if (!isAPlayer) {
            return message.channel.send('You\'re not part of the current game.');
        }

        if (!args.length) {
            return message.channel.send (`You need to supply something to research. Try **${prefix}lore world**`);
        }

        const searchTerm = args.join(' ');

        loreEntry = await Lore.findOne({ where: { tag: searchTerm}});
        
        if (!loreEntry) {
            return message.channel.send('I couldn\'t find a lore entry with that name.');
        }

        const loreEmbed = new Discord.MessageEmbed()
        .setColor('#ff69b4')
        .setTitle(`${loreEntry.tag}`)
        .setDescription(`${loreEntry.description}`);

        message.delete();

        return message.author.send(loreEmbed);
    }
    catch (error) {
        console.log(error);
        return message.channel.send('Error in LORE: something went wrong when reading from the database.');
    }
    }
}