const { prefix } = require('../config.json');
const { Characters, Games, GamePlayers } = require('../dbObjects');
const InventoryManager = require('../services/inventorymanager');


module.exports = {

    name: 'silver',
    description: `Add or remove silver. Usage: ${prefix}silver <args>`,
    async execute(message, args) {

        if (!args.length) {
            return message.channel.send('You need to tell me how much silver to add or remove!');
        }

        const silverAmount = parseInt(args[0]);

        if (isNaN(silverAmount)) {
            return message.channel.send('I can\'t add that to your silver total. Try a number.');
        }

        if (silverAmount == 0) {
            return message.channel.send('You can\'t add or remove a zero.');
        }

        const game = await Games.findOne({ where: { channel: message.channel.id } });

        if (!game) {
            return message.channel.send('There\'s no active game in this channel.')
        }

        const players = await game.getInfo();

        const isAPlayer = players.find(players => (message.author.id));

        if (!isAPlayer) {
            return message.channel.send('You\'re not part of the current game.');
        }

        const currentChar = await Characters.findOne({ where: { user_id: message.author.id, dead: 0 } });

        if (!currentChar) {
            return message.reply(`You don't have a character. Did they die? What a shame. They're gone.`);
        }

        let actionText = '';

        if (silverAmount > 0) {
            actionText = 'added to';
        }
        else {
            actionText = 'removed from';
        }

        const friendlySilver = Math.abs(silverAmount);

        amendedChar = await InventoryManager.AmendSilverTotal(currentChar.character_id, silverAmount);

        message.delete();

        return message.channel.send(`${friendlySilver} silver pieces were ${actionText} ${currentChar.name}'s purse.`);
        

    }
}
