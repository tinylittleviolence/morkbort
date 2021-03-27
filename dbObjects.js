const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Games = require('./models/Game')(sequelize, Sequelize.DataTypes);
const Players = require('./models/Player')(sequelize, Sequelize.DataTypes);;
const GamePlayers = require('./models/GamePlayers')(sequelize, Sequelize.DataTypes);;
const PlayerCharacters = require('./models/PlayerCharacters')(sequelize, Sequelize.DataTypes);;

GamePlayers.belongsTo(Players, { foreignKey: 'player_id', as: 'player'});

//helpers

Games.prototype.end = async function() {
    const game = await Games.findOne({
        where: { id: this.id },
   });

   if (!game) {
       return;
   }
   
    return Games.destroy({
       where: { id: this.id }
    })
};

Games.prototype.addPlayer = async function(channelId, player) {
    const gameplayer = await GamePlayers.findOne({
        where: { player_id: playerId }
    })

    if (gameplayer) {
        return;
    }

    const game = await Games.findOne({
        where: { channel: channelId },
   });

   if (!game) {
       return;
   }

    return GamePlayers.create({ game_id: game.id, player_id: player.id })
};

Players.prototype.create = async function(userId) {
    const player = await Players.findOne({
        where: { user_id: userId }

    })

    if (player) {
        return;
    }

    return Players.create({ user_id: userId});
}

Players.prototype.remove = async function(userId) {
    const player = await Players.findOne({
        where: { user_id: userId }

    })

    if (!player) {
        return;
    }

    return Players.destroy({ 
        where: { user_id: player.user_id }
    });
}

module.exports = { Games, GamePlayers, Players };