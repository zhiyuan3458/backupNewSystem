import Cookies from 'js-cookie';

const tokenKey = 'CTtoken';
const refreshTokenKey = 'refresh_token';

export function getToken () {
  return Cookies.get(tokenKey);
}

export function setTokenInCookie (token) {
  Cookies.set(tokenKey, token.accessToken);
  Cookies.set(refreshTokenKey, token.refreshToken);
}

export function removeToken () {
  return Cookies.remove(tokenKey);
}
