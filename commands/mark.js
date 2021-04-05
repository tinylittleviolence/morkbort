const { prefix } = require('../config.json');
const { Users, Games, GamePlayers, Characters } = require('../dbObjects');
const  Discord = require('discord.js');

module.exports = {

    name: 'mark',
    description: `Mark a character for improvement. Allows the character's owner to use the ${prefix}better command. Usage: ${prefix}mark <player>`,
    async execute(message, args) {

        if (message.author.id != '376022875662057473') {
            return message.reply('You don\'t have the permission to do that on this channel.');
        }

        if (!args.length) {
            return message.channel.send('You must tell me whose character is worthy of improvement. Tag a player.');
        }

        try {
            const playerToAdd = message.mentions.users.first();

            if (!playerToAdd) {
                return message.channel.send('You must tell me whose character is worthy of improvement. Tag a player.');
            }

            const game = await Games.findOne({ where: {channel: message.channel.id }});

            if (!game) {
                return message.channel.send('There\'s no active game in this channel.')
            }

            const gamePlayer = await GamePlayers.findOne({ where: { player_id: playerToAdd.id, game_id: game.id }})

            if (!gamePlayer) {
                return message.channel.send(`${playerToAdd.toString()} isn't part of the game in this channel!`);
            }

            let charToMark = await Characters.findOne( {where: { user_id: playerToAdd.id, dead: 0}});

            if (!charToMark) {
                return message.reply(`I couldn\'t find a living character belonging to ${playerToAdd.tag}. Did they die? That's a horrible shame.`);
            }

        
            if (gamePlayer.character_is_improvable == 1) {
                return message.channel.send(`Either ${playerToAdd}'s character is dead, or they are already marked for improvement.\n\nRun **${prefix}better** first.`);
            }
            
            const updatedPlayer = await gamePlayer.update({ character_is_improvable: 1 }, {returning: true, plain: true});

            console.log(updatedPlayer);

            message.delete();
            return message.reply(`${playerToAdd}: ${charToMark.name} can now get better... it won\'t save them, though.`);
        }
        catch (error) {
            console.log(error);
            return message.channel.send('Error in MARK: couldn\'t mark a character for improvement.');
        }

    }
}
