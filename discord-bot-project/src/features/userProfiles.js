import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('user_profiles.db')
c = conn.cursor()

# Create a table to store user profiles
c.execute('''CREATE TABLE IF NOT EXISTS user_profiles (
             user_id TEXT PRIMARY KEY,
             username TEXT,
             reading_history TEXT,
             preferences TEXT
             )''')

def create_user_profile(user_id, username):
    try:
        c.execute('''INSERT INTO user_profiles (user_id, username, reading_history, preferences)
                     VALUES (?, ?, ?, ?)''', (user_id, username, '', ''))
        conn.commit()
    except sqlite3.IntegrityError:
        pass

def update_reading_history(user_id, reading_history):
    c.execute('''UPDATE user_profiles
                 SET reading_history = ?
                 WHERE user_id = ?''', (reading_history, user_id))
    conn.commit()

def update_preferences(user_id, preferences):
    c.execute('''UPDATE user_profiles
                 SET preferences = ?
                 WHERE user_id = ?''', (preferences, user_id))
    conn.commit()

def get_user_profile(user_id):
    c.execute('''SELECT * FROM user_profiles WHERE user_id = ?''', (user_id,))
    return c.fetchone()

# Close the database connection
conn.close()