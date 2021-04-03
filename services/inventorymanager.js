const { Characters, Inventory, Items} = require ('../dbObjects');
const roll = require('../services/diceroller');

module.exports = {
    async AddToInventoryFromDb(characterId, itemName) {
        const itemToAdd = await Items.findOne({ where: {name: itemName}});
        if (!itemToAdd) {
            return;
        }

        const inventoryItem = await Inventory.create({ 
            character_id: characterId, 
            name: itemToAdd.name, 
            flavour_text: itemToAdd.flavour_text,
            value: itemToAdd.value,
            size: itemToAdd.size,
            is_scroll: itemToAdd.is_scroll
        });

        return inventoryItem;

    },
    async AddToInventoryManual (characterId, name, flavourText, value, size, isScroll) {

        const inventoryItem = await Inventory.create({ 
            character_id: characterId, 
            name: name, 
            flavour_text: flavourText,
            value: value,
            size: size,
            is_scroll: isScroll
        });

        return inventoryItem;
    },
    async GenerateAmmo(characterId, presence, weaponName) {
        try {
        let quantity = 0;
        let itemName = '';
        let flavourText = '';
        let value = 0;
        let size = 'Normal';
        let isScroll = 0;


        if (weaponName === 'Bow') {
            quantity = presence + 10;
            itemName = 'Arrows';
            flavourText = '(' + quantity + ')';
            return AddToInventoryManual(characterId, itemName, flavourText, value, size, isScroll );
        }

        if (weaponName === 'Crossbow') {
            quantity = presence + 10;
            itemName = 'Bolts';
            flavourText = '(' + quantity + ')';
            return AddToInventoryManual(characterId, itemName, flavourText, value, size, isScroll );
        }
        return;
    } 
    catch (error) {
        console.log(error);
    }
    },
    async RemoveFromInventory(item) {

    },
    async SpendAmmo() {

    },
    async BrewDecoction() {

    }
}