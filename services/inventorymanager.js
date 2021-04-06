const { Characters, CharacterAbilities, Inventory, Items} = require ('../dbObjects');
const Armour = require('../models/Armour');
const roll = require('../services/diceroller')




    async function AddToInventoryFromDb(characterId, itemName, isStarterItem) {
        const itemToAdd = await Items.findOne({ where: {name: itemName}});
        if (!itemToAdd) {
            return;
        }

        if (itemToAdd.custom_flavour_text == 1) {
        //treatment for custom flavourtexts

        //Lantern
        if (itemToAdd.name == 'Lantern' && isStarterItem)
         {    
             const char = await CharacterAbilities.findOne({ where: { character_id: characterId}});
             const quantity = char.presence + 6;
             itemToAdd.flavour_text = `with oil for ${quantity} hours`;
         }

        //Lantern oil

        if (itemToAdd.name == 'Lantern oil')
         {    
             const char = await CharacterAbilities.findOne({ where: { character_id: characterId}});
             const quantity = char.presence + 6;
             itemToAdd.flavour_text = `${quantity} hours`;
         }

        //Life elixir

        if (itemToAdd.name == 'Life elixir')
         {    
             const quantity = await roll.Roll(1, 4, 0).total;
             itemToAdd.flavour_text = `${quantity} doses (heals d6 HP and removes infection)`;
         }

        //Medicine Box Stops bleeding/infection and +d6 HP. Presence + 4 uses

        if (itemToAdd.name == 'Medicine box')
         {    
            const char = await CharacterAbilities.findOne({ where: { character_id: characterId}});
            const quantity = char.presence + 4
             itemToAdd.flavour_text = `Stops bleeding/infection and +d6 HP. ${quantity} uses`;
         }

        //Monkeys Ignore you but love you (d4 + 2HP, punch/bite d4)

        if (itemToAdd.name == 'Monkeys')
         {    
             const quantity = await roll.Roll(1, 4, 0).total;
             const hp = await roll.Roll(1, 4, 2).total;
             let pluralName;
             let pluralVerb;
             if (quantity == 1) { pluralName = 'Monkey'; pluralVerb = 'Ignores';}
             else { pluralName = `${quantity} monkeys`; pluralVerb = 'Ignore';}
             itemToAdd.name = `${pluralName}`
             itemToAdd.flavour_text = `${pluralVerb} you but love you (${hp}HP, punch/bite d4)`;
         }

        //Necklace Made from 49 human teeth.
         if (itemToAdd.name == 'Necklace')
         { 
            const quantity = await roll.Roll(1, 50, 10).total;
             itemToAdd.flavour_text = `Made from ${quantity} human teeth`;
         }
        //Torch

        if (itemToAdd.name == 'Torch' && isStarterItem)
         {    
            const char = await CharacterAbilities.findOne({ where: { character_id: characterId}});
            const quantity = char.presence + 4;
            itemToAdd.flavour_text = `(${quantity})`;
         }

        //Small but vicious dog d6 + 2 HP, d4, only obeys you
        if (itemToAdd.name == 'Small but vicious dog')
        { 
           const hp = await roll.Roll(1, 6, 2).total;
           itemToAdd.flavour_text = `${hp}HP, bite d4, only obeys you`

        }
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

    }

    async function AddToInventoryManual (characterId, name, flavourText, value, size, isScroll) {

        const inventoryItem = await Inventory.create({ 
            character_id: characterId, 
            name: name, 
            flavour_text: flavourText,
            value: value,
            size: size,
            is_scroll: isScroll
        });

        return inventoryItem;
    }

    async function GiveItem (giverId, receiverId, item) {

        await RemoveItemFromInventory(giverID);
        const transferredItem = await AddToInventoryManual(receiverId, item.name, item.flavour_text, item.value, item.size, item.is_scroll);

        return transferredItem;
    }

    async function GenerateAmmo(characterId, presence, weaponName) {
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
    }

    async function RemoveFromInventory(item) {
        const removedItem = await Inventory.destroy({ 
            where: {
             id: item.id
        }
        });

        return removedItem;
    }

    async function AddWeapon(characterId, weaponName) {

    weapon = await Weapons.findOne({ where: { name: weaponName}});   

        newWeapon = await CharacterWeapons.create({
            character_id: characterId,
            weapon_id: weapon.id,
            worn: 0
        })

        return newWeapon;
    }

    async function AddArmour(characterId, armourName) {

        armour = await Armour.findOne({ where: { name: armourName}});

        newArmour = await CharacterArmour.create({
            character_id: characterId,
            armour_id: starterArmour.id,
            worn: 0
        });

        return newArmour;
    }

    async function SpendAmmo() {

    }
    async function BrewDecoction() {

    }

module.exports = { AddToInventoryFromDb, AddToInventoryManual, RemoveFromInventory, AddWeapon, AddArmour, SpendAmmo, BrewDecoction, GenerateAmmo, GiveItem}