const { Characters, CharacterAbilities, Inventory, Items, Weapons, Armour, CharacterWeapons, CharacterArmour, Scrolls} = require ('../dbObjects');
const roll = require('../services/diceroller')




    async function AddToInventoryFromDb(characterId, itemName, isStarterItem) {
        let itemToAdd = await Items.findOne({ where: {name: itemName}});
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

    //check to see if the item is a scroll, if it is, roll the scroll and update it with proper descriptions

    if (itemToAdd.is_scroll == 1)
    {
        let scrollType = '';

        if (itemToAdd.name == 'Unclean scroll') { scrollType = 'Unclean'}
        else { scrollType = 'Sacred'}

        itemToAdd = await GetScrollInfo(scrollType, itemToAdd);
        console.log(itemToAdd);
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

    async function GiveItem (giverId, receiverId, itemToTransfer) {
        
        const transferredItem = await AddToInventoryManual(receiverId, itemToTransfer.name, itemToTransfer.flavour_text, itemToTransfer.value, itemToTransfer.size, itemToTransfer.is_scroll);
        await RemoveFromInventory(itemToTransfer);

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

        console.log(removedItem);
        return removedItem;
    }

    async function AddWeapon(characterId, weaponName) {

    const weapon = await Weapons.findOne({ where: { name: weaponName}});   

        newWeapon = await CharacterWeapons.create({
            character_id: characterId,
            weapon_id: weapon.id,
            worn: 0
        })

        return newWeapon;
    }

    async function RemoveWeapon(characterWeapon) {

        
        const droppedWeapon = await characterWeapon.destroy();
    
        return droppedWeapon;

        
        }

    async function AddArmour(characterId, armourName) {

        armour = await Armour.findOne({ where: { name: armourName}});

        newArmour = await CharacterArmour.create({
            character_id: characterId,
            armour_id: armour.id,
            worn: 0
        });

        return newArmour;
    }

    async function RemoveArmour(characterArmour) {

        const droppedArmour = await characterArmour.destroy();

        //check to see if there are any other armours on the character

        const otherArmour = await CharacterArmour.findOne({ where: { character_id: characterArmour.character_id}});

        let addAPlaceholder;

        if (!otherArmour) {
            //if no other armour is on the character
            addAPlaceholder = true;
        }
        else {
            //if we found anything, don't add a placeholder
            addAPlaceholder = false;
        }
        


        //if not, and if the armour we're getting rid of isn't a 'no armour' placeholder, add one in
        if (addAPlaceholder) {

            const noArmour = await AddArmour(characterArmour.character_id, 'No armour');
        }

        return droppedArmour;


    }   

    async function SpendAmmo() {

    }
    async function BrewDecoction() {

    }

    async function AmendSilverTotal(characterId, amount) {

        const receipient = await Characters.findOne( {where: { character_id: characterId}});

        receipient.silver += amount;

        const newRecipient = await receipient.save();

        return newRecipient;

    }

    async function GetScrollInfo(scrollType, scrollItem) {

        scrollRoll = await roll.Roll(1, 10, 0).total;
    
        scrollData = await Scrolls.findOne({ where: { scroll_type: scrollType, roll: scrollRoll}});
    
        scrollItem.name = `${scrollData.name} (${scrollType} scroll)`;
        scrollItem.flavour_text = scrollData.effect;
    
        return scrollItem;
    }

module.exports = { AddToInventoryFromDb, AddToInventoryManual, RemoveFromInventory, AddWeapon, AddArmour, RemoveArmour, SpendAmmo, BrewDecoction, GenerateAmmo, GiveItem, RemoveWeapon, AmendSilverTotal}