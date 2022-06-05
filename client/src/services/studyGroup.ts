import { AxiosPromise } from 'axios';

import API from './api';

export default class StudyGroupAPI extends API {
  static baseUrl: string = 'api/v1/study-groups';
  static getAll(): AxiosPromise {
    return this.get(this.baseUrl);
  }
}