import { AxiosPromise } from 'axios';

import API from './api';

export default class StudentAPI extends API {
  static baseUrl: string = 'api/v1/students';
  static getAll(search?: string): AxiosPromise {
    return this.get(this.baseUrl, {
      search,
    });
  }
}
