const { Users, Games, GamePlayers, Characters, CharacterWeapons } = require('../dbObjects');
const  Discord = require('discord.js');

async function CheckGame(channelId) {

    const game = await Games.findOne({ where: {channel: channelId}});

    return game;
}

async function CheckPlayer(gameId, userId) {

    const players = await GamePlayers.findAll({
        where: { game_id: gameId },
        attributes: ['player_id'],
    })

    const isAPlayer = players.find(players => (userId));

    return isAPlayer;

}

async function CheckCharacter(userId) {

    const currentChar = await Characters.findOne({where: {user_id: userId, dead: 0}});

    return currentChar;
}

module.exports = { CheckGame, CheckPlayer, CheckCharacter };