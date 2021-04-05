const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Users, Characters, Weapons, Armour} = require('../dbObjects');
const Modifiers = require ('../services/modifiergen');
const sequelize = require('sequelize');




module.exports = {
name: 'defend',
    description: `Defend against an attack. Usage: ${prefix}attack`,
    async execute(message, args) {

        let damageRollSeparate = false;
        let damageDice = 1;

        if (args[0]) {
            damageRollSeparate = true;
            
            damageDice = parseInt(args[0]);

            if (isNaN(damageDice)) {
                return message.reply('That\'s not a valid damage die number.');
            }

        }

        let character = await Characters.findOne({ where: { user_id: message.author.id, dead: 0}});

        if (!character) {
            return message.reply('You don\'t seem to have a living character...');
        }

        let defenceDrModifiers = await Modifiers.GetNewDr(character, 'def', 12);

        let originalDiffRating = 12;
        let diffRating = 12 + defenceDrModifiers.modifier;
        let diffReasons = defenceDrModifiers.modifications.join("; ");
        let damageReductionDice = defenceDrModifiers.damageReductionDice;

        let otherModifiers = await Modifiers.GetModifier(character, 'def');

        let defenceModifier = otherModifiers.modifier;
        let modReasons = otherModifiers.modifications.join("; ");
        

        try {
            console.log(`${character.name} tries to defend!`);
        
            const result = await roll.Roll(1, 20, defenceModifier);
            
            let pass = (result.total >= diffRating);
            let critFail = (result.rolls[0] == 1);
            let critHit = (result.rolls[0] == 20);
        
            let resultText = ``;

            let rollDamage = false;
            let rollCrit = false;
            
            if (pass && critHit) {
                resultText = `Success! CRITICAL!`;
                
                
            }
            if (pass && !critHit) {
                resultText = `Success!`;
                
            }
            if (!pass && !critFail) {
                resultText = `You were hit!`;
                rollDamage = true;
            }
            if (!pass && critFail) {
                resultText = `You were hit! FUMBLE!`;
                rollDamage = true;
                rollCrit = true;
            }

            message.reply(`${character.name} tries to defend!
**Original DR:** ${originalDiffRating}
**Defence modifier:** ${defenceModifier}
**Defence modifications:** ${modReasons}
**Modified DR:** ${diffRating}
**DR Modifications:** ${diffReasons}
**Result:** (${result.rolls.join(', ')})
**Total:** (${result.total})
\`${resultText}\``);

//if damage dice args supplied
if (damageRollSeparate) {
            if (rollDamage) {
                damage = await roll.Roll(1, damageDice, 0).total;
                damageReduction = await roll.Roll(1, damageReductionDice, 0).total;

                if (rollCrit) {
                    damage = damage * 2;
                }

                let netDamage = damage - damageReduction;
                if (netDamage < 0) { netDamage = 0 };

                return message.channel.send(`
                ${character.name} was hit for ${damage}! 
Their armour prevented ${damageReduction}! 
They suffered **${netDamage} damage!**`);
            }
        }
            
        
        message.delete();
        }
    catch (error) {
        console.log(error);
        return message.channel.send('Error in DEFEND: couldn\'t get modifier scores.');
    }

    }
}