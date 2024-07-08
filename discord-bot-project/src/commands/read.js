const Discord = require('discord.js');
const { fetchData } = require('../../utils/api');

module.exports = {
    name: 'read',
    description: 'Read a manhwa within the Discord server',
    async execute(message, args) {
        const manhwaTitle = args.join(' ');

        if (!manhwaTitle) {
            return message.reply('Please provide a valid manhwa title to read.');
        }

        try {
            const manhwaData = await fetchData(manhwaTitle);

            if (!manhwaData) {
                return message.reply('Manhwa not found. Please try again with a different title.');
            }

            // Logic to display manhwa title, description, images, and implement page navigation

        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching the manhwa data. Please try again later.');
        }
    },
};