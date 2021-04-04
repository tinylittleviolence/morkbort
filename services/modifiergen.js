const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Users, Characters, Armour, Weapons } = require('../dbObjects');
const Character = require('../models/Character');



module.exports = {
    async GetModifier(character, ability, weapon) {
        let cumulativeModifier = 0;
        let mods = [];

        if (ability == 'atk')
        {
        let charAbilities = await character.getAbilities();

        let abilityModifier = 0;

        if (weapon.is_ranged == 1) {
            abilityModifier = charAbilities.presence;
            console.log(`${weapon.name} is ranged, using Presence`);
        }
        else {
            abilityModifier = charAbilities.strength;
            console.log(`${weapon.name} is melee, using Presence`);
        }


        cumulativeModifier += abilityModifier;
        console.log(`Ability modifier: ${abilityModifier}`);
        mods.push(`Ability modifier: ${abilityModifier}`);

    }

        modifierResponse = {
            modifier: cumulativeModifier,
            modifications: mods
        }

        return modifierResponse;
        
        
    },

    async GetNewDr(character, ability, dr, weapon) {
        let cumulativeDrModifier = 0;
        let drMods = [];

        if (character.class == 1) {
            if (ability == 'agi' && dr == 12) {
                console.log('Character is clumsy, +2DR');
                drMods.push('Clumsy, +2DR');
                cumulativeDrModifier += 2;
            }
        }

        if (character.class == 2) {
            if (ability == 'agi' || ability == 'pre') {
                console.log('Character is stealthy, -2DR');
                drMods.push('Stealthy, -2DR');
                cumulativeDrModifier -= 2;
            }
        
        }

        let charArmour = await character.getArmour();
        
        
        /*Characters.findOne({
            include: [{
                model: Armour, 
                as: 'armour',
                through: { 
                    where: { worn: 1} 
                }}],
            where: {
                character_id: character.character_id
            } }).armour[0];*/

        console.log(charArmour[0]);

        if (!weapon) {
            let charWeapon = await character.getWeapons();
            weapon = charWeapon[0];
        }
        
        /*Characters.findOne({
            include: [{
                model: Weapons, 
                as: 'weapons',
                through: { 
                    where: { worn: 1} 
                }}],
            where: {
                character_id: character.character_id
            } });*/
        
            console.log(weapon);

            console.log(charArmour[0].tier + ' tier armour');

        if (ability == 'agi') {

            if (charArmour[0].tier == 2) {
            
                console.log('Medium armour, +2DR');
                drMods.push('Medium armour, +2DR');
                cumulativeDrModifier += 2;
            }
            if (charArmour[0].tier == 3) {
                console.log('Heavy armour, +4DR');
                drMods.push('Heavy armour, +4DR');
                cumulativeDrModifier += 4;
            }
        
        }

        if (ability == 'def') {
            
            if (charArmour[0].tier == 3) {
                console.log('heavy armour, +2DR');
                drMods.push('heavy armour, +2DR');
                cumulativeDrModifier += 2;
            }

            cumulativeDrModifier += weapon.defence_dr_modifier;
            console.log(`Weapon modifier, ${weapon.defence_dr_modifier}DR`);
            drMods.push(`Weapon modifier, ${weapon.defence_dr_modifier}DR`);
        }

        if (ability == 'atk') {

            cumulativeDrModifier += weapon.attack_dr_modifier;
            console.log(`Weapon modifier, ${weapon.attack_dr_modifier}DR`);
            drMods.push(`Weapon modifier, ${weapon.attack_dr_modifier}DR`);
        }

        let damageReductionDice = charArmour[0].damage_modifier_dice;


        console.log(`total DR mod is ${cumulativeDrModifier}`)

        modifierResponse = {
            modifier: cumulativeDrModifier,
            modifications: drMods,
            damageReductionDice: damageReductionDice
        }

        return modifierResponse;
    }
}