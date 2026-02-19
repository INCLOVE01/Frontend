import { db } from "./db";

/**
 * Ensures the database is ready for client-side operations.
 * @returns {Promise<boolean>}
 */
export const isDbReady = async () => {
  // 1. Check if we are on the server
  if (typeof window === 'undefined') return false;

  try {
    // 2. If the DB is already open, return true
    if (db.isOpen()) return true;

    // 3. Otherwise, try to open it
    await db.open();
    return true;
  } catch (err) {
    console.error("Database Guard Error:", err);
    return false;
  }
};