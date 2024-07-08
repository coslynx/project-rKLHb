const Discord = require('discord.js');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./discord-bot-project/data/userProfiles.db');

module.exports = {
  fetchManhwaTitles: async () => {
    try {
      const response = await fetch('https://api.manhwa-api.com/manhwas');
      const data = await response.json();
      return data.titles;
    } catch (error) {
      console.error('Error fetching manhwa titles:', error);
      return [];
    }
  },
  
  updateManhwaLibrary: async () => {
    try {
      const response = await fetch('https://api.manhwa-api.com/latest');
      const data = await response.json();
      return data.newReleases;
    } catch (error) {
      console.error('Error updating manhwa library:', error);
      return [];
    }
  },
  
  searchManhwa: async (query) => {
    try {
      const response = await fetch(`https://api.manhwa-api.com/search?q=${query}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching manhwa:', error);
      return [];
    }
  },
  
  fetchManhwaDetails: async (title) => {
    try {
      const response = await fetch(`https://api.manhwa-api.com/manhwas/${title}`);
      const data = await response.json();
      return data.details;
    } catch (error) {
      console.error('Error fetching manhwa details:', error);
      return null;
    }
  },
  
  updateUserProfile: (userId, profileData) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO userProfiles VALUES (?, ?)');
    stmt.run(userId, JSON.stringify(profileData));
    stmt.finalize();
  },
  
  getUserProfile: (userId) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT profileData FROM userProfiles WHERE userId = ?', userId, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? JSON.parse(row.profileData) : null);
        }
      });
    });
  },
};