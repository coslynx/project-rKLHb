const { fetchManhwaData } = require('../../utils/api');
const { getUserProfile, updateUserProfile } = require('./userProfiles');
const { addToRecentlyRead, removeFromRecentlyRead } = require('./notifications');
const { addToBookmark, removeFromBookmark } = require('./bookmarking');

const readManhwa = async (message, manhwaTitle) => {
  try {
    const manhwaData = await fetchManhwaData(manhwaTitle);
    if (!manhwaData) {
      message.channel.send(`Manhwa '${manhwaTitle}' not found. Please try again.`);
      return;
    }

    const userProfile = getUserProfile(message.author.id);
    if (!userProfile) {
      message.channel.send('User profile not found. Please create a profile first.');
      return;
    }

    // Logic to read manhwa and update user profile

    // Add manhwa to recently read
    addToRecentlyRead(message.author.id, manhwaData.title);

    message.channel.send(`Successfully reading '${manhwaData.title}'. Enjoy!`);
  } catch (error) {
    console.error('Error reading manhwa:', error);
    message.channel.send('An error occurred while reading the manhwa. Please try again later.');
  }
};

module.exports = { readManhwa };