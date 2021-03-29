const { prefix } = require('../config.json');
const { Users, Games, GamePlayers } = require('../dbObjects');
const  Discord = require('discord.js');

module.exports = {

    name: 'game',
    description: `Access to overarching game controls. Usage: ${prefix}game [start | end | addplayer] <args>`,
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You must supply at least one argument to the game command.');
        }

        if (args[0] === 'start') {

            if (!args[1]) {
                return message.channel.send('You must supply a number of sides for the misery dice to have.');
            }

            const miserySides = parseInt(args[1]);

            if (isNaN(miserySides)) {
                return message.channel.send('The misery dice argument must be a number.');
            }

            try {
                const game = await Games.findOne({ where: {channel: message.channel.id }});
                if (game) {
                    return message.channel.send('There\'s already a game in this channel.');
                }

                newGame = await Games.create({ channel: message.channel.id, misery_dice: miserySides, miseries: 0});
                message.delete;
                return message.channel.send(`Game created in ${message.channel.toString()} with misery dice: d${newGame.misery_dice}.`)
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in GAME: couldn\'t create a new game in this channel.');
            }
        }

        else if (args[0] === 'end') {
            try {
                const game = await Games.findOne({ where: {channel: message.channel.id }});

                if (!game) {
                    return message.channel.send('There\'s no active game in this channel to end, I\'m afraid.')
                }

                game.end();
                message.delete();
                return message.channel.send(`The game in this channel has ended. May there be mercy beyond the Veil, you poor, miserable bastards.`);
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in GAME: couldn\'t end the game in this channel.');
            }
        }
        else if (args[0] === 'addplayer') {
            //TODO
            try {
            const playerToAdd = message.mentions.users.first();

            if (!playerToAdd) {

                return message.channel.send('You haven\'t told me who to add to the game. Mention someone with an @ after the command.');
            }

            const game = await Games.findOne({ where: {channel: message.channel.id }});

            if (!game) {
                return message.channel.send('There\'s no active game in this channel to add a player to.')
            }

            const gamePlayer = await GamePlayers.findOne({ where: { player_id: playerToAdd.id, game_id: game.id }})

            if (gamePlayer) {
                return message.channel.send(`${playerToAdd.toString()} is already taking part in a game in this channel!`)
            }

            newGamePlayer = await GamePlayers.create({ player_id: playerToAdd.id, game_id: game.id });
            message.delete();
            return message.channel.send(`${playerToAdd.toString()} has been added to the game in ${message.channel.toString()}.`)
        }
        catch (error) {
            console.log(error);
            return message.channel.send('Error in GAME: couldn\'t add a player to the game in this channel.');
        }

        }
        else if (args[0] === 'info') {
            try {

            const game = await Games.findOne({ where: {channel: message.channel.id }});

            if (!game) {
                return message.channel.send('There\'s no active game in this channel.')
            }

            players = await game.getInfo();

            if (!players.length) {
                return message.channel.send('There\s no one playing in this channel yet.');
            }
            
            //there has to be a better way of doing this, but I'm running out of time. Definitely come back and sort this out, because I'm gonna need this a lot.

            for (i = 0; i < players.length; i++) {
                const nickdata = await message.guild.members.fetch('376022875662057473');
                const nick = nickdata.nickname;
                players[i].player_id = nick;
            }

            const infoEmbed = new Discord.MessageEmbed()
            .setColor('FFFF01')
            .setTitle(`MORK BORG in ${message.channel.name}:`)
            .setDescription(`Current players: ${players.map(i => `${i.player_id}`).join(', ')}
            Misery Dice: d${game.misery_dice}
            Miseries that have come to pass: ${game.miseries}`);
            message.delete();
        
            return message.channel.send(infoEmbed);
        }
        catch (error) {
            console.log(error);
            return message.channel.send('Error in GAME: failed to fetch game information from the database.');
        }


        }
        
        return message.channel.send('You must supply a valid argument to the game command. Accepted values are [start | end | addplayer | info]');



    }
}