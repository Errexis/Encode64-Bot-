const Discord = require("discord.js")

module.exports = {
    name: "clear",
    author: "Errexis",

    run: (client, message, args) => { 
        let amount = args.join()
        message.channel.bulkDelete(amount)
        message.channel.send(`foram apagadas **${amount}** mensagens.`)
    }
}