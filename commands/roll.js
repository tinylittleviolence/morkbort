const { prefix } = require('../config.json');
const roll = require('../services/diceroller');

module.exports = {

    name: 'roll',
    description: `Roll a dice with [sides] faces, and apply [modifier]. If no modifier is specified, none will be applied. Usage: ${prefix}roll [sides] [modifier].`,
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You must at least tell me what kind of dice to roll, ${message.author}!`);
        }
        
        const squishedArgs = args.join('');

        console.log(squishedArgs);


        const squishedDiceNum = squishedArgs.match(/\d+(?=d)/i);
        const squishedD = squishedArgs.match(/(?<=\d*)d/i);
        const squishedSides = squishedArgs.match(/(?<=\d*d)\d+/i);
        const squishedModifierSign = squishedArgs.match(/(?<=\d*d\d+)[\+\-]/i);
        const squishedModifierNumber = squishedArgs.match(/(?<=\d*d\d+[\+\-])\d+/i);

        const debugPattern = `
Extracted dice number: ${squishedDiceNum}
Extracted D: ${squishedD}
Extracted sides: ${squishedSides}
Extracted modifier sign: ${squishedModifierSign}
Extracted modifier value: ${squishedModifierNumber}
`
 console.log(debugPattern);

        let numDice = 1;

        if (squishedDiceNum) {
            numDice = parseInt(squishedDiceNum);

            if (isNaN(numDice)) {
                return message.channel.send(`Error in ROLL: That's not a valid number of dice to roll, ${message.author}.`);
            }
        }

        const sides = parseInt(squishedSides);

        if (isNaN(sides)) {
            return message.channel.send(`Error in ROLL: That doesn't seem to be a valid number of sides for a die to have, ${message.author}.`);
        }

        let modifier = 0;
        let modifierMultiplier = 1;

        if (squishedModifierSign) {
            if (squishedModifierSign == '+') {
                modifierMultiplier = 1;
            }
            if (squishedModifierSign == '-') {
                modifierMultiplier = -1
            }
        }

        if (squishedModifierNumber) {
            modifier = parseInt(squishedModifierNumber);
        }

        if (isNaN(modifier)) {
            return message.channel.send(`Error in ROLL: The roll modifier must be a number, ${message.author}. You can't add whatever that is to a dice roll.`);
        }

        modifier =  modifier * modifierMultiplier;
        
        try {
            console.log(`calling roll with ${numDice}, ${sides}, ${modifier}`);
           const result = roll.Roll(numDice, sides, modifier);

            let friendlyModifier = `${modifier}`;

            if (modifier >= 0) {

                friendlyModifier = '+' + friendlyModifier;
            }


            message.channel.send(`${message.author} casts the bones...
**Rolled:** ${numDice}d${sides}${friendlyModifier}
**Results:** (${result.rolls.join(', ')})
**Total:** [${result.total}]`)

            message.delete();
        }
        catch (error) {
            console.error(error);
            message.reply('I shit the bed trying to roll whatever the hell it was you asked me to.');
    }
        
    }
}