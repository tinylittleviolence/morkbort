const { prefix } = require('../config.json');
const { Characters, Armour, Weapons, Items } = require('../dbObjects');
const Embedder = require('../services/charembedgen');
const InventoryManager = require('../services/inventorymanager');
const sequelize = require('sequelize');

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

            searchArray.push(args[i]);

        }

        let searchTerm = searchArray.join(' ');
        console.log(searchTerm);

        if (args[0] == 'additem') {

            //return message.channel.send('This command isn\'t ready yet.');

            if (!searchTerm) {
                return message.channel.send('You need to tell me what you want to pick up.');
            }
            

            const itemToAdd = await Items.findOne({ where: 
                sequelize.where(sequelize.fn('lower', sequelize.col('name')), searchTerm)
            });

            if (!itemToAdd) {
                return message.channel.send('I couldn\'t find an item with that name. If it\'s something one of your comrades is holding, they\'ll need to **##inv giveitem** it to you.');
            }

            try {

                const addedItem = await InventoryManager.AddToInventoryFromDb(currentChar.character_id, itemToAdd.name);

                console.log(addedItem);

                message.delete();

                return message.channel.send(`${currentChar.name} picked up the ${addedItem.name}.`);
            }
            catch (error) {
                console.log(error);
                message.channel.send('Error in CHAR: Couldn\'t add an item to inventory.');
            }
        }

        if (args[0] == 'giveitem') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'dropitem') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'addweapon') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'dropweapon') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'addarmour') {
            return message.channel.send('That command isn\'t ready yet.');
        }

        if (args[0] == 'droparmour') {
            return message.channel.send('That command isn\'t ready yet.');
        }
    }
}