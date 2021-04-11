const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Characters, Weapons } = require('../dbObjects');
const sequelize = require('sequelize');




module.exports = {
name: 'wield',
    description: `Wield a weapon. Usage: ${prefix}wield <weapon you are carrying>`,
    async execute(message, args) {
        
    }
}
