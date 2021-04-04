const { Users, Games, GamePlayers, Characters, CharacterWeapons } = require('../dbObjects');
const  Discord = require('discord.js');
const characterGen = require('../services/charactergen');
const roll = require('../services/diceroller');
const CharacterSpecialisation = require('../models/CharacterSpecialisation');

module.exports = {
    async GetEmbed(currentChar, message) {
        charClass = await currentChar.getCharacterclass();
            console.log(charClass);

            classInnates = await charClass.getClassinnates();

            charAbilities = await currentChar.getAbilities();

            charSpec = await currentChar.getSpecialisations();

            charArmour =  await currentChar.getArmour();

            charWeapons = await currentChar.getWeapons();

            charInventory = await currentChar.getInventory();

            console.log(charInventory);

            let specFields = [];

            for (let i = 0; i < charSpec.length; i++) {
                specFields.push({ name: `${charSpec[i].name}`, value: `${charSpec[i].description}`})
            }

            let innateFields = [];

            for (let i = 0; i < classInnates.length; i++) {
                innateFields.push({ name: `${classInnates[i].name}`, value: `${classInnates[i].description}`})
            }

            let inventoryNarratives = [];

           for (let i = 0; i < charInventory.length; i++) {
                let narrative = charInventory[i].name;
                if (charInventory[i].flavour_text) 
                {
                    narrative = narrative + ' *' + charInventory[i].flavour_text + '*';
                }
                inventoryNarratives.push(narrative);
            }

            const characterEmbed = new Discord.MessageEmbed()
            .setColor('FFFF01')
            .setTitle(`You are **${currentChar.name}**.`)
            .setDescription(`${charClass.description}`)
            .addFields([
                { name: `${charClass.origin_description}`, value: `${currentChar.origin}` },
                { name: 'Traits and habits', value: `${currentChar.traits} ${currentChar.broken_bodies} ${currentChar.habits}` },
            ])
            .addFields(specFields)
            .addFields(innateFields)
            .addFields([    
                { name: 'Abilities', value: `
                Strength: ${charAbilities.strength}
                Presence: ${charAbilities.presence}
                Agility: ${charAbilities.agility}
                Toughness: ${charAbilities.toughness}`},
                { name: 'Weapons', value: `${charWeapons.map(i => `${i.name} (${i.damage_dice_number}d${i.damage_dice}+${i.damage_modifier} damage)`).join("\n")}`},
                { name: 'Armour', value: `${charArmour.map(i => `${i.name} (Tier ${i.tier}, -d${i.damage_modifier_dice} damage, DR +${i.agility_test_modifier} to agility tests, DR +${i.defence_modifier} to defence tests)`).join("\n")}`},
                { name: 'Omens', value: currentChar.omens, inline: true },
                { name: 'Silver', value: currentChar.silver, inline: true },
                { name: 'Power uses', value: currentChar.power_uses, inline: true },
                { name: 'Max HP', value: currentChar.max_hp, inline: true },
                { name: 'Starting inventory', value: inventoryNarratives.join("\n")}
            ])
            .setFooter(`This is ${message.author.tag}'s character.`);
            return characterEmbed;

    }
}