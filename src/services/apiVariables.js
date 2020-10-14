import { generateQuery } from './helperFunctions';

export const commonApi = {
  getCommonAPIPOST: {
    api: 'api/getCommonAPIPOST',
    method: 'post',
    baseURL: 'normal',
  },
  getCommonAPIGET: {
    url: 'api/getCommonAPIGET',
    method: 'get',
    query: {
      id: null
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
    baseURL: 'normal',
  },
};
