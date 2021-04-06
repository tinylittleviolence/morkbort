const { prefix } = require('../config.json');
const { Users, Games, GamePlayers, Characters, CharacterWeapons, CharacterArmour, CharacterAbilities } = require('../dbObjects');
const  Discord = require('discord.js');
const characterGen = require('../services/charactergen');
const roll = require('../services/diceroller');
const CharacterSpecialisation = require('../models/CharacterSpecialisation');
const Embedder = require('../services/charembedgen');
const char = require('./char');

async function GetAbilityScoreChange(abilityScore) {

    let change = 0;
    const improvementRoll = await roll.Roll(1, 6, 0).total;

    console.log('abilityscore is ' + abilityScore);
    console.log('roll is ' + improvementRoll);

    if (abilityScore <= 1) {
        if (improvementRoll == 1 && abilityScore > -3) {
            change = -1;
        }
        else {
            change = 1;
        }
    }
    if (abilityScore > 1) {
        console.log('more than 1!');
        if (improvementRoll >= abilityScore && abilityScore < 6) {
            change = 1;
        }
        else if (improvementRoll < abilityScore && abilityScore > -3) {
            change = -1;
        }
        else {
            change = 0;
        }

    }
    console.log('change is ' + change);
    return change;

}

module.exports = {
    name: 'better',
        description: `Improve your character. Available only after your character has been marked for improvement by the Game Master. Usage: ${prefix}better`,
        async execute(message, args) {
            //return message.channel.send ('This command isn\'t ready yet.');

            //roll 6d10, if >= to max hp then increase by d6.
            //roll d6, get thing
            //roll d6 against each ability:
            //if -3 to +1, increase by 1 unless a 1 is rolled
            //max is +6, min is -3

            try {
            const game = await Games.findOne({ where: {channel: message.channel.id }});

            if (!game) {
                return message.channel.send('There\'s no active game in this channel.')
            }

            const gamePlayer = await GamePlayers.findOne({ where: { player_id: message.author.id, game_id: game.id }})

            if (!gamePlayer) {
                return message.channel.send(`${playerToAdd.toString()} isn't part of the game in this channel!`);
            }

            let charToBetter = await Characters.findOne( {where: { user_id: message.author.id, dead: 0}});

            if (!charToBetter) {
                return message.reply(`You don't have a living character in this channel. Did they die? That's a horrible shame.`);
            }

            if (gamePlayer.character_is_improvable == 0) {
                return message.reply(`Your character isn\'t marked for improvement. The GM controls when characters improve.`);
            }

            let charAbilities = await charToBetter.getAbilities();

            //vars

            let maxHpToAdd;
            let strChange;
            let preChange;
            let agiChange;
            let touChange;

            const hpImprovementRoll = await roll.Roll(6, 10, 0).total;

            if (hpImprovementRoll >= charToBetter.max_hp) {
                 maxHpToAdd = await roll.Roll(1, 6, 0).total;
            } 
            else {
                maxHpToAdd = 0;
            }

            const newHp = charToBetter.max_hp + maxHpToAdd;

            strChange = charAbilities.strength + await GetAbilityScoreChange(charAbilities.strength);
            preChange = charAbilities.presence + await GetAbilityScoreChange(charAbilities.presence);
            agiChange = charAbilities.agility + await GetAbilityScoreChange(charAbilities.agility);
            touChange = charAbilities.toughness + await GetAbilityScoreChange(charAbilities.toughness);

            let hpText;
            let strText;
            let preText;
            let agiText;
            let touText;

            if (maxHpToAdd != 0) {
                hpText = `Maximum HP increased from ${charToBetter.max_hp} to ${newHp}!`;
            }
            else {
                hpText = `Maximum HP did not change!`;
            }
            if (strChange > charAbilities.strength) {
                strText = `Strength increased from ${charAbilities.strength} to ${strChange}!`;
            }
            if (strChange < charAbilities.strength) {
                strText = `Strength decreased from ${charAbilities.strength} to ${strChange}!`;
            }
            if (strChange == charAbilities.strength) {
                strText = `Strength remained at ${charAbilities.strength}!`;
            }
            if (preChange > charAbilities.presence) {
                preText = `Presence increased from ${charAbilities.presence} to ${preChange}!`;
            }
            if (preChange < charAbilities.presence) {
                preText = `Presence decreased from ${charAbilities.presence} to ${preChange}!`;
            }
            if (preChange == charAbilities.presence) {
                preText = `Presence remained at ${charAbilities.presence}!`;
            }
            if (agiChange > charAbilities.agility) {
                agiText = `Agility increased from ${charAbilities.agility} to ${agiChange}!`;
            }
            if (agiChange < charAbilities.agility) {
                agiText = `Agility decreased from ${charAbilities.agility} to ${agiChange}!`;
            }
            if (agiChange == charAbilities.agility) {
                agiText = `Agility remained at ${charAbilities.agility}!`;
            }
            if (touChange > charAbilities.toughness) {
                touText = `Toughness increased from ${charAbilities.toughness} to ${touChange}!`;
            }
            if (touChange < charAbilities.toughness) {
                touText = `Toughness decreased from ${charAbilities.toughness} to ${touChange}!`;
            }
            if (touChange == charAbilities.toughness) {
                touText = `Toughness remained at ${charAbilities.toughness}!`;
            }

            const betterText = hpText + '\n' + strText + '\n' + preText + '\n' + agiText + '\n' + touText;

            //save the data instance and the new abilities to the database, mark the player's character as 'not improvable'

            charToBetter.max_hp += maxHpToAdd;

            charAbilities.strength = strChange;
            charAbilities.presence = preChange;
            charAbilities.agility = agiChange;
            charAbilities.toughness = touChange;

            gamePlayer.character_is_improvable = 0;

            const updatedAbilities = await charAbilities.save();
            const updatedChar = await charToBetter.save();
            const updatedGamePlayer = await gamePlayer.save();

        console.log(betterText);

        const betterEmbed = new Discord.MessageEmbed()
        .setColor('#ff69b4')
        .setTitle(`${charToBetter.name} gets better (or worse)...`)
        .setDescription(betterText);
        
        message.delete();

        return message.channel.send(betterEmbed);
                

        }
        catch (error) {
            console.log(error);
            return message.channel.send(`Error in BETTER: couldn't improve or degrade a character.`);
        }
        }
    }
    