/* mainFrame/header API */
import request from '@/utils/request';

const authority = '/authority';
export const logout = (token) => request.delete(`${authority}/user/logout`);
