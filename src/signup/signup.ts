// signup.ts handles the signup process and saves the user information to the database. It receives the data from bridge.ts and inserts it into the users table.

import sqlite3 from 'sqlite3';
import { receiveMessage } from '../bridges/bridge.ts';
import { sha256 } from '../shared/shared.ts';

const db = new sqlite3.Database('users.db');

async function handleSignup() {
  const data = await receiveMessage();

  // Guard against failed fetches or missing fields
  if (!data || !data.username || !data.password) {
    console.error('Signup aborted: Invalid or missing user data.');
    return;
  }

  let username = data.username;
  let password = sha256(data.password);

  db.get("SELECT * FROM users WHERE username = ?", [username], (err: any, row: any) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      return;
    }

    if (row) {
      console.log(`Signup failed: Username ${username} already exists.`);
      process.exit(1); // Exit the process with a non-zero status code to indicate failure
    }
});

  // db.serialize guarantees the table is created before the INSERT runs
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      )
    `);

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, password], function (err) {
      if (err) {
        console.error('Error inserting user into database:', err.message);
        return;
      }
      console.log(`User ${username} signed up successfully with ID: ${this.lastID}.`);
    });
  });
}

handleSignup();
