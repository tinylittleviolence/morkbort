const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Characters, Weapons, Innates, Items, CharacterWeapons, CharacterSpecialisations } = require('../dbObjects');
const sequelize = require('sequelize');




module.exports = {
name: 'wield',
    description: `Wield a weapon. Usage: ${prefix}wield <weapon you are carrying>`,
    async execute(message, args) {
   
        return message.channel.send('This command isn\'t ready yet.');
        
    

    }
}
