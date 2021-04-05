const { prefix } = require('../config.json');
const { Users, Games, GamePlayers, Miseries, GameMiseries } = require('../dbObjects');
const  Discord = require('discord.js');
const roll = require('../services/diceroller.js');

module.exports = {

    name: 'misery',
    description: `Checks for dire prophecies to come true at dawn. Usage: ${prefix}misery`,
    async execute(message, args) {

        const game = await Games.findOne({ where: {channel: message.channel.id }});

        if (!game) {
            return message.channel.send('There\'s no active game in this channel.')
        }

        const players = await game.getInfo();

        const isAPlayer = players.find(players => (message.author.id));

        if (!isAPlayer) {
            return message.channel.send('You\'re not part of the current game.');
        }

        const miseryRoll = await roll.Roll(1, game.misery_dice, 0).total;
        const currentMiseries = game.miseries;

        console.log(`Current miseries are ${game.miseries}`);
        console.log(`Misery dice is ${game.misery_dice}`);
        console.log(`Rolled ${miseryRoll}`);

        if (miseryRoll == 1) {
            let miseryToPass = '';
            let miseryTitle = 'INEVITABLE EVENTS DEMAND THEIR PLACE.';


            if (currentMiseries == 6) {
                miseryToPass = await Miseries.findOne({ where: { psalm_number: 77}});
                miseryTitle = 'AND THE DARKNESS SHALL SWALLOW THE DARKNESS SHALL SWALLOW THE DARKNESS SHALL SWALLOW THE DARKNESS';
                
            }
            else {
                let rollOne = await roll.Roll(1, 6, 0).total * 10;
                let rollTwo = await roll.Roll(1, 6, 0).total;
                let totalRoll = rollOne + rollTwo;
                console.log(totalRoll);
                miseryToPass = await Miseries.findOne({ where: { psalm_number: totalRoll}});
                let gameMiseryExists = await GameMiseries.findOne({ where: { game_id: game.id, psalm_number: totalRoll}});

                if (gameMiseryExists) {
                do { 
                    console.log('Already had this misery, rerolling');
                     rollOne = await roll.Roll(1, 6, 0).total * 10;
                     rollTwo = await roll.Roll(1, 6, 0).total;
                     totalRoll = rollOne + rollTwo;
                     miseryToPass = await Miseries.findOne({ where: { psalm_number: totalRoll}});
                     gameMiseryExists = await GameMiseries.findOne({ where: { game_id: game.id, psalm_number: totalRoll}});
                  } while (gameMiseryExists);
                }
            }

            const newMiseryCount = currentMiseries + 1;

            const updatedGame = await Games.update({miseries: newMiseryCount}, {where: { id: game.id} });
            const createdMisery = await GameMiseries.create({ game_id: game.id, psalm_number: miseryToPass.psalm_number});

            const miseryEmbed = new Discord.MessageEmbed()
            .setColor('FFFF01')
            .setTitle(`${miseryTitle}`)
            .setDescription(`*${miseryToPass.psalm_text}*`);

            if (newMiseryCount == 7) {
                game.end();
                miseryEmbed.setFooter('The seventh seal is broken for the seventh and final time. THE GAME AND YOUR LIVES END HERE.');
            }


            return message.channel.send(miseryEmbed);


        }

        return message.channel.send('The sun rises on this blackened land with little change but for the hopelessness you feel. This agony will end some other day. For now, you struggle.');
        
    }
}