const { prefix } = require('../config.json');
const { Users, Games, GamePlayers, Characters, CharacterWeapons } = require('../dbObjects');
const  Discord = require('discord.js');
const characterGen = require('../services/charactergen');
const roll = require('../services/diceroller');
const CharacterSpecialisation = require('../models/CharacterSpecialisation');
const Embedder = require('../services/charembedgen');

module.exports = {

    name: 'char',
    description: `Character commands. Usage: ${prefix}char [gen | info | inventory | kill | better] <args>`,
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You must supply at least one argument to the char command. [gen | info | inventory | kill | better]');
        }

        //check to see if the player is in the current game

        const game = await Games.findOne({ where: {channel: message.channel.id }});

        if (!game) {
            return message.channel.send('There\'s no active game in this channel.')
        }

        const players = await game.getInfo();

        const isAPlayer = players.find(players => (message.author.id));

        if (!isAPlayer) {
            return message.channel.send('You\'re not part of the current game.');
        }


        if (args[0] === 'gen') {

            try {
                const currentChar = await Characters.findOne({where: {user_id: message.author.id, dead: 0}});

            if (currentChar) {
                return message.reply(`You already have a living character (${currentChar.name}) in the current game. Don't worry, they won't last long.`);
            }

            let classRoll;
            if (!args[1] || isNaN(args[1]))
            {
                classRoll = await roll.Roll(1, 6, 0).total;
            }
            else 
            {
                classRoll = args[1];
            }
            const genChar = await characterGen.CharGen(message.author.id, classRoll);

            const characterEmbed = await Embedder.GetEmbed(genChar, message);

            message.delete();

            return message.reply(characterEmbed);
        }
        catch (error) {
            console.log(error);
            message.reply('I shit the bed trying to do that.');
        }
        }

        if (args[0] === 'info') {

            try {
                const currentChar = await Characters.findOne({where: {user_id: message.author.id, dead: 0}});

            if (!currentChar) {
                return message.reply(`You don't have a character. Did they die? What a shame. They're gone.`);
            }

            let characterEmbed = await Embedder.GetEmbed(currentChar, message);

            message.delete();

            return message.author.send(characterEmbed);
        }
        catch (error) {
            console.log(error);
            message.channel.send('I shit the bed trying to do that.');
        }
        }

        if (args[0] === 'kill') {
        
        if (message.author.id != '376022875662057473') {
            return message.reply('You don\'t have the permission to do that on this channel.');
        }

        if (!args[1]) {
            return message.reply('You need to tell me who to kill. There\'s no use in being indiscriminate about it.');
        }   
        try {
            const killTarget = message.mentions.users.first();

            const charToKill = await Characters.findOne( {where: { user_id: killTarget.id, dead: 0}});
            
            if (!charToKill) {
                return message.reply(`I couldn\'t find a character to kill belonging to ${killTarget}.`)
            }

            const deadChar = await Characters.update({ dead: 1 }, { where: { character_id: charToKill.character_id}, returning: true, plain: true});

            console.log(deadChar);

            const gamePlayer = await GamePlayers.findOne( { where: {game_id: game.id, player_id: killTarget.id}});

            if (gamePlayer.character_is_improvable == 1) {
                //if they're marked for improvement, undo that. Obviously.
                gamePlayer.update( {character_is_improvable: 0});
            }

            return message.reply(`${charToKill.name} went back to the mud. As do all things, eventually.`);
        }
        catch (error) {
                console.log(error);
                message.channel.send('I shit the bed trying to do that.');
            }
        
        }

    }
}