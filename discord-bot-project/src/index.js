const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('../config.json');
const { library, readFunctionality, bookmarking, searchFunction, userProfiles, notifications } = require('./features');

client.once('ready', () => {
    console.log('Bot is ready');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'library') {
        library.execute(message, args);
    } else if (command === 'read') {
        readFunctionality.execute(message, args);
    } else if (command === 'bookmark') {
        bookmarking.execute(message, args);
    } else if (command === 'search') {
        searchFunction.execute(message, args);
    } else if (command === 'profile') {
        userProfiles.execute(message, args);
    } else if (command === 'notify') {
        notifications.execute(message, args);
    }
});

client.login(token);