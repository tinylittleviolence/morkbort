const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Characters } = require('../dbObjects');
const InventoryManager = require('../services/inventorymanager');




module.exports = {
    name: 'gm',
    description: `GM controls. Usage: ${prefix}gm [ create | silver | kill | announce ] <args>`,
    async execute(message, args) {

        if (message.author.id != '376022875662057473') {
            return message.reply('You don\'t have the permission to do that on this channel.');
        }

        if (!args.length) {
            return message.channel.send('You must supply at least one argument to the gm command. [ create | givesilver | kill | announce ]');
        }

        if (args[0] == 'silver') {

            if (!args[1]) {
                return message.channel.send('You need to tell me how much silver to add or remove! Try **##gm silver 30 @somebody**');
            }

            const receipient = message.mentions.users.first();

            if (!receipient) {
                return message.channel.send('You need to tell me whose purse to amend! **##gm silver 30 @somebody**');
            }

            const silverAmount = parseInt(args[1]);

            if (isNaN(silverAmount)) {
                return message.channel.send('I can\'t add that to your silver total. Try a number.');
            }

            if (silverAmount == 0) {
                return message.channel.send('You can\'t add or remove a zero.');
            }

            const currentChar = await Characters.findOne({ where: { user_id: receipient.id, dead: 0 } });

        if (!currentChar) {
            return message.reply(`${receipient} doesn't have an active character. They might be dead.`);
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
}