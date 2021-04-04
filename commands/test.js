const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');
const { Users, Characters } = require('../dbObjects');

module.exports = {

    name: 'test',
    description: `Performs a test against the specified ability and DR. Usage: ${prefix}test agi 12`,
    execute(message, args) {

        if (!args) {
            return message.reply(`You need to tell me what you\'re testing. Usage:Usage: ${prefix}test agi 12`);
        }

        let abilityMatch = false;

        let abilityToTest = '';

        if (args[1].toLowerCase().substring(0, 3) === 'str') {
            abilityMatch = true;
            abilityToTest = 'str'
        }
        if (args[1].toLowerCase().substring(0, 3) === 'pre') {
            abilityMatch = true;
            abilityToTest = 'pre'
        }
        if (args[1].toLowerCase().substring(0, 3) === 'agi') {
            abilityMatch = true;
            abilityToTest = 'agi'
        }
        if (args[1].toLowerCase().substring(0, 3) === 'tou') {
            abilityMatch = true;
            abilityToTest = 'tou'
        }

        if (!abilityMatch) {
            return message.reply('You haven\'t supplied a valid ability to test. Try either a shorthand (str, pre, agi, tou) or the full word (e.g. Strength)');
        }

        if (!abilityToTest) {
            return message.reply('I failed to work out which ability you were trying to test.');
        }

        if (!args[2]) {
            return message.reply('It doesn\'t look like you\'ve supplied a difficulty rating (DR). It should be a number.');
        }

        let diffRating = parseInt(args[2]);
        
        if(isNaN(diffRating)) {
            return message.reply('Looks like that difficulty rating isn\'t a number. Try again.');
        }
        
        //find the author's living character
        let character = await Characters.findOne({ where: {user_id = message.author.id, dead: 0 }});

        console.log(character.name);

        let charAbilities = await character.getAbilities();

        console.log(charAbilities);

        //DEV: these are placeholders for now. need to change them to handle args.
        let ability = abilityToTest;
        let modifier = 0;
    

        try {
            console.log(`Testing ${ability} at DR ${diffRating} with a modifier of ${modifier}...`);
            const result = roll.Roll(1, 20, modifier);
            
            let pass = (result.total >= diffRating);
            let critFail = (result.total == 1);
            let critHit = (result.total == 20);
        
            let resultText = ``;
            
            if (pass && critHit) {
                resultText = `**Pass! CRITICAL!**`;
            }
            if (pass && !critHit) {
                resultText = `**Pass!**`;
            }
            if (!pass && !critFail) {
                resultText = `**Fail!**`;
            }
            if (!pass && critFail) {
                resultText = `**Fail!** FUMBLE!`;
            }
            

            message.channel.send(`${message.author} tests ${ability}...
**Modifier:** ${modifier}
**DR:** ${diffRating}
**Result:** (${result.total})
${resultText}`);

            message.delete();
        }
        catch (error) {
            console.error(error);
            message.reply('I shit the bed trying to roll whatever the hell it was you asked me to.');
    }
    }
}
