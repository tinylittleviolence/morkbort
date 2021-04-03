const { prefix } = require('../config.json');
const { Users, Games, GamePlayers } = require('../dbObjects');
const  Discord = require('discord.js');
const characterGen = require('../services/charactergen');
const roll = require('../services/diceroller');

module.exports = {

    name: 'char',
    description: `Character commands. Usage: ${prefix}char [gen | info | inventory | kill | better] <args>`,
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You must supply at least one argument to the char command. [gen | info | inventory | kill | better]');
        }

        if (args[0] === 'gen') {
            const classRoll = roll.Roll(1, 6, 0).total;
            const genChar = await characterGen.CharGen(message.author.id, classRoll);
        }

    }
}