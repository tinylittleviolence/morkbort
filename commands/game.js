const { prefix } = require('../config.json');
const { Users, Games, GamePlayers } = require('../dbObjects');

console.log(Games);


module.exports = {

    name: 'game',
    description: `Access to overarching game controls. Usage: ${prefix}game [start | end | addplayer] <args>`,
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You must supply at least one argument to the game command.');
        }

        if (args[0] === 'start') {

            if (!args[1]) {
                return message.channel.send('You must supply a number of sides for the misery dice to have.');
            }

            const miserySides = parseInt(args[1]);

            if (isNaN(miserySides)) {
                return message.channel.send('The misery dice argument must be a number.');
            }

            try {
                const game = await Games.findOne({ channel_id: message.channel.id });
                if (game) {
                    return message.channel.send('There\'s already a game in this channel.');
                }

                newGame = await Games.create({ channel: message.channel.id, misery_dice: miserySides, miseries: 0});
                message.delete;
                return message.channel.send(`Game created in ${message.channel.toString()} with misery dice: d${newGame.misery_dice}.`)
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in GAME: couldn\'t create a new game in this channel.');
            }
        }

        else if (args[0] === 'end') {
            try {
                const game = await Games.findOne({ channel_id: message.channel.id });

                if (!game) {
                    return message.channel.send('There\'s no active game in this channel to end, I\'m afraid.')
                }

                game.end();
                message.delete;
                return message.channel.send(`The game in this channel has ended. May there be mercy beyond the Veil, you poor, miserable bastards.`);
            }
            catch (error) {
                console.log(error);
                return message.channel.send('Error in GAME: couldn\'t end the game in this channel.');
            }
        }
        else if (args[0] === 'addplayer') {
            //TODO
        }
        
        return message.channel.send('You must supply a valid argument to the game command. Accepted values are [start | end | addplayer]');



    }
}