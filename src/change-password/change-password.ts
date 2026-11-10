// change-password.ts handles the password change process. It receives the data from bridge.ts and updates the user's password in the users table.

import sqlite3 from 'sqlite3';
import { receivePasswordChange } from '../bridges/bridge.ts';
import { sha256 } from '../shared/shared.ts';

const db = new sqlite3.Database('users.db');

async function handlePasswordChange() {
  const data = await receivePasswordChange();

  if (!data || !data.username || !data.oldPassword || !data.newPassword) {
    console.error('Password change aborted: Invalid or missing data.');
    return;
  }

  let oldPass = sha256(data.oldPassword)

  const sql = `UPDATE users SET password = ? WHERE username = ? AND password = ?`;

  db.run(sql, [sha256(data.newPassword), data.username, oldPass], function (err) {
    if (err) {
      console.error('Error updating password in database:', err.message);
      return;
    }

    if (this.changes === 0) {
      console.warn(`No user found with username or password does not match: ${data.username}`);
    } else {
      console.log(`Password updated successfully for user: ${data.username}.`);
    }
  });
}

handlePasswordChange();
