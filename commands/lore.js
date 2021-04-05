const { prefix } = require('../config.json');
const { Lore } = require('../dbObjects');





module.exports = {
name: 'lore',
    description: `Learn more about the horrible world. Usage: ${prefix}lore <search term>`,
    async execute(message, args) {
        return message.channel.send ('This command isn\'t ready yet.');
    }
}