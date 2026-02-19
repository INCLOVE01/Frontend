import { Dexie } from "dexie"

// initiating the db
// Define the schema
// Syntax: '++id' is an auto-incrementing primary key
// Only index the fields you need to query/filter by.
// Open the DB explicitly (optional but good for debugging)
// &email = unique index (no duplicate emails)
// isActive = indexed so we can find the "logged in" user quickly
// identity_id maps to the short_code from the identities table
// createdAt is indexed so we can sort the wall or check post intervals
// Stores daily voting tokens or history to prevent double-voting locally

export const db = new Dexie("myDatabase")
db.version(5).stores({
    identities: '++id, &email, inclove_token, isActive, lastUsed',
    posts: '++id, identity_id, createdAt, status',
    votes: '++id, [identity_id+date], target_post_id',
    local_likes: '++id, [post_id+user_email], post_id, user_email'
})

if (typeof window !== 'undefined') {
  db.open().catch((err) => {
    console.error("Failed to open Dexie:", err.stack || err);
  });
}