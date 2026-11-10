// test.ts send info to main API

import express from 'express';
import type { Request, Response } from 'express';


const app = express();
const PORT = 5000;

app.get('/signup', (req: Request, res: Response) => {
  const mockUser = {
    username: 'test_user_05',
    password: 'supersecretpassword123'
  };
  res.status(200).json(mockUser);
});

app.listen(PORT, 'localhost', () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
