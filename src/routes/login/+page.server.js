import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Assuming the backend returns a token or session ID
        if (result.token) {
          cookies.set('token', result.token, { path: '/', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
        }
        throw redirect(302, '/'); // Redirect to home or dashboard on successful login
      } else {
        return { success: false, isError: true, message: result.message || 'Login failed.' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, isError: true, message: 'Network error or server is unreachable.' };
    }
  },
};
