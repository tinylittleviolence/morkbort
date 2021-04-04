const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Users, Characters } = require('../dbObjects');
const Modifiers = require ('../services/modifiergen');
const char = require('./char');

module.exports = {

    name: 'test',
    description: `Performs a test against the specified ability and DR. Usage: ${prefix}test agi 12`,
    async execute(message, args) {

        if (!args) {
            return message.reply(`You need to tell me what you\'re testing. Usage:Usage: ${prefix}test agi 12`);
        }

        let abilityMatch = false;

        let abilityToTest = '';

        if (args[0].toLowerCase().substring(0, 3) === 'str') {
            abilityMatch = true;
            abilityToTest = 'str'
        }
        if (args[0].toLowerCase().substring(0, 3) === 'pre') {
            abilityMatch = true;
            abilityToTest = 'pre'
        }
        if (args[0].toLowerCase().substring(0, 3) === 'agi') {
            abilityMatch = true;
            abilityToTest = 'agi'
        }
        if (args[0].toLowerCase().substring(0, 3) === 'tou') {
            abilityMatch = true;
            abilityToTest = 'tou'
        }

        if (!abilityMatch) {
            return message.reply('You haven\'t supplied a valid ability to test. Try either a shorthand (str, pre, agi, tou) or the full word (e.g. Strength)');
        }

        if (!abilityToTest) {
            return message.reply('I failed to work out which ability you were trying to test.');
        }

        if (!args[1]) {
            return message.reply('It doesn\'t look like you\'ve supplied a difficulty rating (DR). It should be a number.');
        }

        let diffRating = parseInt(args[1]);
        
        if(isNaN(diffRating)) {
            return message.reply('Looks like that difficulty rating isn\'t a number. Try again.');
        }
        
        //find the author's living character
        let character = await Characters.findOne({ where: {user_id: message.author.id, dead: 0 }});

        if (!character) {
            return message.reply('You don\'t seem to have a living character...');
        }

        console.log(character.name);

        let charAbilities = await character.getAbilities();

        console.log(charAbilities);


        //get any modifiers to the diffRating based on equipment and class

        let diffModifier = await Modifiers.GetNewDr(character, abilityToTest, diffRating);

        let newDiffRating = diffRating + diffModifier.modifier;

        let DrAdjustmentReasons = diffModifier.modifications.join("; ");

        //base mod, plus ability score

        let modifier = 0;

        if (abilityToTest == 'str') {
            modifier += charAbilities.strength;
            console.log(`Added str mod of ${charAbilities.strength}`);
        }
        if (abilityToTest == 'pre') {
            modifier += charAbilities.presence;
            console.log(`Added pre mod of ${charAbilities.presence}`);
        }
        if (abilityToTest == 'agi') {
            modifier += charAbilities.agility;
            console.log(`Added agi mod of ${charAbilities.agility}`);
        }
        if (abilityToTest == 'tou') {
            modifier += charAbilities.toughness;
            console.log(`Added tou mod of ${charAbilities.toughness}`);
        }

        //get any misc modifiers

        let mod = await Modifiers.GetModifier(character, abilityToTest);

        modifier += mod.modifier;
    

        try {
            console.log(`${character.name} tests ${abilityToTest} at Difficulty Rating ${diffRating}...`);
        
            const result = roll.Roll(1, 20, modifier);
            
            let pass = (result.total >= newDiffRating);
            let critFail = (result.total == 1);
            let critHit = (result.total == 20);
        
            let resultText = ``;
            
            if (pass && critHit) {
                resultText = `Pass! CRITICAL!`;
            }
            if (pass && !critHit) {
                resultText = `Pass!`;
            }
            if (!pass && !critFail) {
                resultText = `Fail!`;
            }
            if (!pass && critFail) {
                resultText = `Fail! FUMBLE!`;
            }
            

            message.channel.send(`${message.author} ${character.name} tests ${abilityToTest.toUpperCase()} at Difficulty Rating ${diffRating}...
**Original DR:** ${diffRating}
**Ability modifier:** ${modifier}
**Modified DR:** ${newDiffRating}
**Modifications:** ${DrAdjustmentReasons}
**Result:** (${result.rolls.join(', ')})
**Total:** (${result.total})
\`${resultText}\``);

            message.delete();
        }
        catch (error) {
            console.error(error);
            message.reply('I shit the bed trying to roll whatever the hell it was you asked me to.');
    }
    }
}
