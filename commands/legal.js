const  Discord = require('discord.js');
const { prefix } = require('../config.json');
module.exports = {

    name: 'legal',
    description: `Displays the MORK BORG license text.`,
    execute(message, args) {
    try {
    const legalEmbed = new Discord.MessageEmbed()
        .setColor('FFFF01')
        .setTitle('Legal and licensing')
        .setDescription(`MorkBort is an independent production by Simon Baines and is not affiliated with Ockult Örtmästare Games or Stockholm Kartell. It is published under the MÖRK BORG Third Party License. 
        
        MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.
        
        The MorkBort software is supplied as is, and the author accepts no responsibility for any loss or damage that occurs from its use.`);

        message.delete();
        
    message.channel.send(legalEmbed);
    }
    catch (error) {
        console.log(error);
        message.channel.send('There was an issue displaying the license text.');
    }

    }
}