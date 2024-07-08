const Discord = require('discord.js');
const { fetchDataFromAPI } = require('../../utils/api');

module.exports = {
  name: 'manhwa',
  description: 'Display a list of manhwa titles for users to choose from',

  async execute(message, args) {
    try {
      const manhwaData = await fetchDataFromAPI('manhwa');
      
      if (!manhwaData || manhwaData.length === 0) {
        return message.channel.send('No manhwa titles available at the moment. Please try again later.');
      }

      const manhwaTitles = manhwaData.map(manhwa => manhwa.title).join('\n');
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Manhwa Library')
        .setDescription(manhwaTitles);

      message.channel.send(embed);
    } catch (error) {
      console.error('Error fetching manhwa data:', error);
      message.channel.send('An error occurred while fetching manhwa data. Please try again later.');
    }
  },
};