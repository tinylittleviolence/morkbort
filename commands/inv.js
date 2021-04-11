const { prefix } = require('../config.json');
const { Characters, Armour, Weapons, Items, Inventory, CharacterWeapons, CharacterArmour } = require('../dbObjects');
const Embedder = require('../services/charembedgen');
const InventoryManager = require('../services/inventorymanager');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

module.exports = {

    name: 'inv',
    description: `Inventory operations. Usage: ${prefix}inv [additem | giveitem | dropitem | addweapon | addarmour] <args>`,
    async execute(message, args) {


        const currentChar = await Characters.findOne({ where: { user_id: message.author.id, dead: 0 } });

        if (!currentChar) {
            return message.reply(`You don't have a character. Did they die? What a shame. They're gone.`);
        }

        if (!args.length) {
            try {

                let invEmbed = await Embedder.GetInventoryEmbed(currentChar, message);

                message.delete();

                return message.author.send(invEmbed);
            }
            catch (error) {
                console.log(error);
                message.channel.send('Error in CHAR: Couldn\'t get a character\'s inventory.');
            }
        }

        //get all args after the first one and squish them into a search term

        const searchArray = [];

        for (let i = 1; i < args.length; i++) {

            if (!args[i].startsWith('<@!')) {
                searchArray.push(args[i]);
            }

        }

        let searchTerm = searchArray.join(' ');
        console.log(searchTerm);

        if (args[0] == 'additem') {

            //return message.channel.send('This command isn\'t ready yet.');

            if (!searchTerm) {
                return message.channel.send('You need to tell me what you want to pick up.');
            }


            const itemToAdd = await Items.findOne({
                where:
                    sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm)
            });

            if (!itemToAdd) {
                return message.channel.send('I couldn\'t find an item with that name. If it\'s something one of your comrades is holding, they\'ll need to **##inv giveitem** it to you.');
            }

            try {

                const addedItem = await InventoryManager.AddToInventoryFromDb(currentChar.character_id, itemToAdd.name);

                //console.log(addedItem);

                message.delete();

                return message.channel.send(`${currentChar.name} picked up the ${addedItem.name}.`);
            }
            catch (error) {
                console.log(error);
                message.channel.send('Error in CHAR: Couldn\'t add an item to inventory.');
            }
        }

        if (args[0] == 'giveitem') {
            //return message.channel.send('This command isn\'t ready yet.');
            try {
                const receipient = message.mentions.users.first();

                if (!receipient) {
                    return message.channel.send('You need to tell me who to give this to. Tag them after the command, like this: **##inv giveitem lockpicks @somebody**');
                }

                const targetChar = await Characters.findOne({ where: { user_id: receipient.id, dead: 0 } });

                if (!targetChar) {
                    return message.channel.send(`${receipient} doesn\'t seem to have a living character... did they die? Condolences.`);
                }

                const itemToGive = await Inventory.findOne({
                    where:
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm),
                    character_id: currentChar.character_id,
                });

                if (!itemToGive) {
                    return message.reply('I couldn\'t find an item in your inventory with that name');
                }


                const givenItem = await InventoryManager.GiveItem(currentChar.character_id, targetChar.character_id, itemToGive);

                message.delete();

                return message.channel.send(`${currentChar.name} gave their ${itemToGive.name} to ${targetChar.name}`);
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in INV: couldn\'t give an item to another character.');
            }

        }

        if (args[0] == 'dropitem') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'addweapon') {

            try {
                //return message.channel.send('That command isn\'t ready yet.');

                const weaponToAdd = await Weapons.findOne({
                    where:
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm)
                });

                if (!weaponToAdd) {
                    return message.reply('I couldn\'t find an weapon with that name');
                }

                const addedWeapon = await InventoryManager.AddWeapon(currentChar.character_id, weaponToAdd.name);

                //console.log(addedWeapon);

                message.delete();

                message.channel.send(`${currentChar.name} picked up the ${weaponToAdd.name}.`);
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in INV: couldn\'t pick up a weapon.');
            }

        }

        if (args[0] == 'dropweapon') {
            //return message.channel.send('That command isn\'t ready yet.');

            try {

                const weaponToDrop = await Weapons.findOne({
                    where:
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm)
                });

                //console.log(weaponToDrop);

                if (!weaponToDrop) {
                    return message.reply('I couldn\'t find an weapon with that name');
                }

                const heldWeapon = await CharacterWeapons.findOne({ where: { character_id: currentChar.character_id, weapon_id: weaponToDrop.id } });

                //console.log(heldWeapon);

                if (!heldWeapon) {
                    return message.reply('You\'re not holding a weapon with that name.');
                }

                droppedWeapon = await InventoryManager.RemoveWeapon(heldWeapon);

                //console.log(droppedWeapon);

                message.delete();

                message.channel.send(`${currentChar.name} dropped the ${weaponToDrop.name}.`);

            }
            catch (error) {
                console.log(error);
                message.channel.send('Error in INV: couldn\'t drop a held weapon.');
            }
        }

        if (args[0] == 'addarmour') {
            //return message.channel.send('That command isn\'t ready yet.');

            try {
                const armourToPickup = await Armour.findOne({
                    where:
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm)
                });

                if (!armourToPickup) {
                    return message.reply('I couldn\'t find a type of armour with that name.');
                }

                //get current armour details

                const charArmour = await currentChar.getArmour();

                const wornArmour = charArmour[0];

                const armourToDrop = wornArmour.character_armour;

                //put on the new stuff

                newArmour = await InventoryManager.AddArmour(currentChar.character_id, armourToPickup.name);

                //drop the old stuff, incorporating a check to see if we need to add in a placeholder

                droppedArmour = await InventoryManager.RemoveArmour(armourToDrop);

                //check to see if the removed armour was a 'no armour' placeholder

                let replyText; 

                if (wornArmour.tier == 0) {
                    replyText = `${currentChar.name} put on the ${armourToPickup.name}.`;
                }
                else {
                    replyText = `${currentChar.name} took off their ${wornArmour.name} and put on the ${armourToPickup.name}.`;
                }

                message.delete();

                return message.channel.send(replyText);

            }

            catch (error) {
                console.log(error);
                message.channel.send('Error in INV: couldn\'t pick up armour.');
            }
        }

        if (args[0] == 'droparmour') {
            //return message.channel.send('That command isn\'t ready yet.');
            try {
                const charArmour = await currentChar.getArmour({ where: { tier: { [Op.ne]: 0 } } });

                //make sure it's not a 'no armour' entry

                const armour = charArmour[0];

                console.log(armour);

                if (!armour) {
                    return message.reply('You\'re not wearing any armour!');
                }

                const armourToDrop = armour.character_armour;

                droppedArmour = await InventoryManager.RemoveArmour(armourToDrop);

                message.delete();

                return message.channel.send(`${currentChar.name} took off their ${armour.name}.`)
            }
            catch (error) {
                console.log(error);
                message.channel.send('Error in INV: couldn\'t drop armour.');
            }
        }
    }
}