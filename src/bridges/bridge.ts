// bridge.ts recieves information from any language from localhost it should NOT save the data to the table that is handled by 'signup.ts' which is passed information this is simply a bridge to get information from python.

export interface UserPayload {
  username: string;
  password: string;
}

export async function receiveMessage(): Promise<UserPayload | null> {
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserPayload = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export interface PasswordChangePayload {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export async function receivePasswordChange(): Promise<PasswordChangePayload | null> {
  try {
    const response = await fetch('http://localhost:5000/change-password', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: PasswordChangePayload = await response.json();
    return data;
  } catch (error) {
    console.error('Bridge fetch error:', error);
    return null;
  }
}

export async function receiveSigninMessage(): Promise<UserPayload | null> {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserPayload = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}