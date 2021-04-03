const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Games = require('./models/Game')(sequelize, Sequelize.DataTypes);
const Players = require('./models/Player')(sequelize, Sequelize.DataTypes);
const GamePlayers = require('./models/GamePlayers')(sequelize, Sequelize.DataTypes);
const PlayerCharacters = require('./models/PlayerCharacters')(sequelize, Sequelize.DataTypes);

GamePlayers.belongsTo(Players, { foreignKey: 'player_id', as: 'player'});

const Characters = require('./models/Character')(sequelize, Sequelize.DataTypes);
const CharacterAbilities = require('./models/CharacterAbilities')(sequelize, Sequelize.DataTypes);
const Classes = require('./models/Class')(sequelize, Sequelize.DataTypes);
const Inventory = require('./models/Inventory')(sequelize, Sequelize.DataTypes);
const Items = require('./models/Item')(sequelize, Sequelize.DataTypes);
const Armour = require('./models/Armour')(sequelize, Sequelize.DataTypes);
const Weapons = require('./models/Weapon')(sequelize, Sequelize.DataTypes);

const Traits = require('./models/Traits')(sequelize, Sequelize.DataTypes);
const BrokenBodies = require('./models/BrokenBodies')(sequelize, Sequelize.DataTypes);
const Habits = require('./models/Habits')(sequelize, Sequelize.DataTypes);
const Origins = require('./models/Origin')(sequelize, Sequelize.DataTypes);

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

Games.prototype.getInfo = async function() {
    
    return GamePlayers.findAll({
        where: { game_id: this.id },
        attributes: ['player_id'],
    })

    


};

Players.prototype.register = async function(userId) {
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

module.exports = { Games, GamePlayers, Players, Characters, CharacterAbilities, Items, Classes, Inventory, Armour, Weapons, Traits, BrokenBodies, Habits, Origins};