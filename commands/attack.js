const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Users, Characters, Weapons } = require('../dbObjects');
const Modifiers = require ('../services/modifiergen');
const sequelize = require('sequelize');




module.exports = {
name: 'attack',
    description: `Attack with a weapon you hold. Usage: ${prefix}attack <weapon>`,
    async execute(message, args) {


        if (!args.length) {
            return message.reply(`You need to tell me what to attack with. If you want to use your hands, type **${prefix}attack unarmed**.`);
        }

        let weaponText = args[0].toString();

        console.log(weaponText);

        //find a living character
        let character = await Characters.findOne({ where: { user_id: message.author.id, dead: 0}});

        if (!character) {
            return message.reply('You don\'t seem to have a living character...');
        }

        let foundWeapon;

        if (weaponText == 'unarmed') {
            //if unarmed
            foundWeapon = await Weapons.findOne( {where: { name: 'bare hands'}});
        }
        else {
            //otherwise move to lowercase and check db
            foundWeapon = await character.getWeapons({ where: 
            sequelize.where(sequelize.fn('lower', sequelize.col('name')), weaponText)
        });
        //first item, since its an array 
        foundWeapon = foundWeapon[0];
    }

        console.log(foundWeapon);

        if (!foundWeapon) {
            return message.reply('You\'re not holding a weapon called that.');
        }

        let attackDrModifiers = await Modifiers.GetNewDr(character, 'atk', 12);

        let originalDiffRating = 12;
        let diffRating = 12 + attackDrModifiers.modifier;
        let diffReasons = attackDrModifiers.modifications.join("; ");

        let attackRollModifiers = await Modifiers.GetModifier(character, 'atk', foundWeapon);

        let attackModifier = attackRollModifiers.modifier;
        let modReasons = attackRollModifiers.modifications.join("; ");


        try {
            console.log(`${character.name} attacks with ${foundWeapon.name}!`);
        
            const result = await roll.Roll(1, 20, attackModifier);
            
            let pass = (result.total >= diffRating);
            let critFail = (result.rolls[0] == 1);
            let critHit = (result.rolls[0] == 20);
        
            let resultText = ``;

            let rollDamage = false;
            let rollCrit = false;
            
            if (pass && critHit) {
                resultText = `Hit! CRITICAL!`;
                rollDamage = true;
                rollCrit = true;
            }
            if (pass && !critHit) {
                resultText = `Hit!`;
                rollDamage = true;
            }
            if (!pass && !critFail) {
                resultText = `Miss!`;
            }
            if (!pass && critFail) {
                resultText = `Miss! FUMBLE!`;
            }

            message.reply(`${character.name} attacks with their ${foundWeapon.name}!
**Original DR:** ${originalDiffRating}
**Attack modifier:** ${attackModifier}
**Attack modifications:** ${modReasons}
**Modified DR:** ${diffRating}
**DR Modifications:** ${diffReasons}
**Result:** (${result.rolls.join(', ')})
**Total:** (${result.total})
\`${resultText}\``);

            if (rollDamage) {
                damage = await roll.Roll(foundWeapon.damage_dice_number, foundWeapon.damage_dice, foundWeapon.damage_modifier).total;

                if (rollCrit) {
                    damage = damage * 2;
                }

                return message.channel.send(`${character.name} did ${damage} damage!`);
            }
            
                        message.delete();



        }
        catch (error) {
            console.log(error);
            return message.channel.send('Error in ATTACK: There was an issue getting ability scores.');
        }




    }
}