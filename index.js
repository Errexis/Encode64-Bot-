const { Client, Intents, MessageFlags } = require('discord.js'); //lib do discord
const dotenv = require("dotenv"); //.env

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], 
});

dotenv.config();
//Puxando o prefix do Bot que está dentro do .env
const prefix = process.env.PREFIX; 
//Função para deixar o bot Online
client.on('ready', () => {
    console.log(`${client.user.tag} está online.`);//envia uma log que o bot está online
});

//Função que puxa os comandos do bot
client.on('messageCreate', message => { 
    if (message.author.bot) return; //Se a mensagem for do bot ele retorna 
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
    const args = message.content //argumento depois do prefix e o comando
        .trim().slice(prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase(); 

    try{
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (error) {
        console.error('Error:' + error);
    }
});

client.login(process.env.TOKEN);