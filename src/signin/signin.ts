// signin.ts handles the signin process and verifies the user credentials against the database. It receives the data from bridge.ts and checks if the username and password match an existing user in the users table.
import sqlite3 from 'sqlite3';
import { receiveSigninMessage } from '../bridges/bridge.ts';
import { sha256 } from '../shared/shared.ts';

const db = new sqlite3.Database('users.db');

async function handleSignin() {
  const data = await receiveSigninMessage();

  // Guard against failed fetches or missing fields
  if (!data || !data.username || !data.password) {
    console.error('Signin aborted: Invalid or missing user data.');
    return;
  }
  
  let username = data.username;
  let password = sha256(data.password);

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            return;
        }

        if (row) {
            console.log(`User ${username} signed in successfully.`);
        } else {
            console.log(`Signin failed: Invalid username or password for user ${username}.`);
        }
    });
}

handleSignin();
