const { getUserBookmark, addUserBookmark, removeUserBookmark } = require('../../utils/database');

module.exports = {
  name: 'bookmark',
  description: 'Bookmark a manhwa for easy access',
  execute(message, args) {
    const manhwaTitle = args.join(' ');

    if (!manhwaTitle) {
      return message.reply('Please provide a valid manhwa title to bookmark.');
    }

    const userId = message.author.id;

    const userBookmark = getUserBookmark(userId);

    if (userBookmark.includes(manhwaTitle)) {
      return message.reply(`You have already bookmarked ${manhwaTitle}.`);
    }

    addUserBookmark(userId, manhwaTitle);
    message.reply(`Successfully bookmarked ${manhwaTitle}.`);
  },
};