const Discord = require("discord.js")
//utiliza o mesmo processo, mas de forma inversa  
module.exports = {
    name: "clear",
    author: "Errexis",

    run: async (client, message) => { 
    const botMessage = await message.channel.send("Insira o texto que deseja decodificar.");
    const collector = message.channel.createMessageCollector({
        max: 1,
        time: 1000 * 10,
        onMessage: async (botMessage, message) =>{},
    });
    collector.on('collect', message => {
        if (message.author.id) {
            const base64 = message.content;
            const buff = Buffer.from(base64, 'base64');
            const str = buff.toString('utf-8');
            message.reply(str)
            const CollectorOff = message.reply('o seu texto foi decodificado. Até mais!')
            collector.stop('O coletor foi finalizado')
                return CollectorOff
        }
    });
    collector.on('end', (CollectorOff) => {
        message.react('👋')
    })
    }
}