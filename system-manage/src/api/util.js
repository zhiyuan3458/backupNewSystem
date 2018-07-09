import request from '@/utils/request';

export const getHttp = (url, params) => {
  Object.keys(params).forEach((item, index) => {
    if (index === 0) {
      url += `?${item}=${params[item]}`;
    } else {
      url += `&${item}=${params[item]}`;
    }
  });
  return request.get(url);
};
