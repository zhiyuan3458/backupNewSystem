import Cookies from 'js-cookie';

const tokenKey = 'CTtoken';
const refreshTokenKey = 'refresh_token';
const getTokenTimeKey = 'getToken_time';

export function getToken () {
  return Cookies.get(tokenKey);
}

export function getRefreshToken () {
  return Cookies.get(refreshTokenKey);
}

export function setTokenInCookie (token) {
  token.accessToken = 'CTtoken ' + token.accessToken;
  Cookies.set(tokenKey, token.accessToken);
  Cookies.set(refreshTokenKey, token.refreshToken);
}

export function removeToken () {
  Cookies.remove(refreshTokenKey);
  Cookies.remove(tokenKey);
  Cookies.remove(getTokenTimeKey);
}

export function setGetTokenTime () {
  Cookies.set(getTokenTimeKey, new Date().getTime() + '');
}

export function getGetTokenTime () {
  return Cookies.get(getTokenTimeKey);
}
