import { jwtDecode } from 'jwt-decode';

export function isLoggedIn() {
  const token = localStorage.getItem('access');      //Checks if a JWT access token 
  return !!token;
}

export function getUserInfo() {                      //Decodes JWT and returns user data
  const token = localStorage.getItem('access');    //Gets the access token from localStorage.
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

export function isAdmin() {
  const user = getUserInfo();
  return user && (user.is_staff || user.is_superuser);  //	Checks if user is admin/staff
}
