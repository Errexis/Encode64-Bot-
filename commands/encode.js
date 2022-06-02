
const Discord = require("discord.js")

module.exports = {
    name: "clear",
    author: "Errexis",

    run: async (client, message) => { 
    const botMessage = await message.channel.send("Insira o texto que deseja codificar."); //envia a mensagem e espera uma resposta
    const collector = message.channel.createMessageCollector({
        max: 1, //maximo de respostas
        time: 1000 * 10, //temporizador
        onMessage: async (botMessage, message) =>{},
    }); //assim que enviado a resposta, ele a coleta 
    collector.on('collect', (message, CollectorOff) => {
        if (message.author.id) {
            const str = message.content; //transforma a resposa em uma string
            const buff = Buffer.from(str, 'utf-8'); //converte a string para o padrão UTF-8 
            const base64 = buff.toString('base64'); //converte para base64
            message.reply(base64); //envia a resposta convertida para base64
            const CollectorOff = message.reply('o seu texto foi codificado. Até mais!') //finaliza o coletor
            collector.stop('O coletor foi finalizado')
                return CollectorOff
        }
    });
    collector.on('end', (CollectorOff) => { //para sinalizar que acabou o tempo ou ja foi utilizado ele manda uma reação
        message.react('👋')
    });
    }
}