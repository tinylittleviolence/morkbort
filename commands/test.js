const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');

module.exports = {

    name: 'test',
    description: `Performs a test against the specified ability and DR. Usage: ${prefix}test agi 12`,
    execute(message, args) {

        //DEV: these are placeholders for now. need to change them to handle args.
        let ability = '[TEST-ABILITY]';
        let modifier = 0;
        let diffRating = 12;

        try {
            console.log(`testing ${ability} at DR ${diffRating} with a modifier of ${modifier}...`);
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
