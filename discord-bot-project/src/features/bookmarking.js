const { getUserProfile, updateUserProfile } = require('../utils/database');

const bookmarkManhwa = (userId, manhwaId) => {
    const userProfile = getUserProfile(userId);
    
    if (userProfile) {
        if (!userProfile.bookmarks.includes(manhwaId)) {
            userProfile.bookmarks.push(manhwaId);
            updateUserProfile(userId, userProfile);
            return "Manhwa bookmarked successfully!";
        } else {
            return "Manhwa already bookmarked!";
        }
    } else {
        return "User profile not found. Please create a profile first.";
    }
};

const getBookmarks = (userId) => {
    const userProfile = getUserProfile(userId);
    
    if (userProfile) {
        return userProfile.bookmarks;
    } else {
        return "User profile not found. Please create a profile first.";
    }
};

module.exports = {
    bookmarkManhwa,
    getBookmarks,
};