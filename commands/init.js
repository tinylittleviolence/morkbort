const { prefix } = require('../config.json');
const roll = require('../services/diceroller.js');

module.exports = {

    name: 'init',
    description: `Rolls initiative. Usage: ${prefix}init`,
    execute(message, args) {
        //1-3 enemies go first
        //4-6 pc's go first
        try {
        const initRoll = roll.Roll(1, 6, 0);
        let starter = '';

        if (initRoll.total < 4) {
            starter = 'Enemies';
        }
        else  {
          starter = 'Players'
        }

        message.channel.send(`
**Initiative roll:** [${initRoll.total}] 
${starter} go first!`);

        message.delete();
    }
    catch (error) {
        console.log(error);
        message.reply('Error in INIT: Failed to roll initiative for some reason.');
    }

    }
}
