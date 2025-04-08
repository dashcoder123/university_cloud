/**
 * Logs in a user to OpenStack Keystone and returns the token and user info.
 * 
 * @param {string} username - Keystone username (e.g., 'Account').
 * @param {string} password - Keystone user password.
 * @param {string} project - (Optional) Project name. Default is 'admin'.
 * @returns {Promise<{ token: string, userData: object }>}
 */
export async function keystoneLogin(username, password, project = 'admin') {
  try {
    const url = 'https://192.168.0.205:5000/v3/auth/tokens';
    
    const body = {
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: username,
              domain: { id: 'default' },
              password: password,
            },
          },
        },
        scope: {
          project: {
            domain: { id: 'default' },
            name: project,
          },
        },
      },
    };

    // 🔵 Log the request body (masked password for safety)
    console.log('🔵 Sending Keystone auth request:', {
      url,
      username,
      project,
      password: '***', // don’t log raw password
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 🟡 Log response status
    console.log(`🟡 Keystone response status: ${response.status}`);

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Keystone error response:', error);
      throw new Error(error.error?.message || 'Login failed');
    }

    const token = response.headers.get('x-subject-token');
    const userData = await response.json();

    // 🟢 Log success
    console.log('🟢 Keystone login successful!');
    console.log('🟢 Token received:', token);
    console.log('🟢 User data received:', userData);

    return { token, userData };
  } catch (error) {
    console.error('🔴 Keystone login exception:', error.message);
    throw error;
  }
}
