// services/userService.js
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database/database.json');

async function getDb() {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

export const userService = {
  async getHomeData(userId) {
    const db = await getDb();
    
    // Logic: Find the current user and their "Matches"
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");

    // Mock complex business logic: Filter matches based on user preference
    const matches = db.users.filter(u => 
      u.id !== userId && u.gender === user.preference
    );

    return {
      profile: user,
      matches: matches.slice(0, 10), // Limit for MVP
      notifications: db.notifications.filter(n => n.userId === userId)
    };
  }
};