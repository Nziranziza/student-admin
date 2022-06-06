import { AxiosPromise } from 'axios';

import API from './api';

export type StudyGroupFilters = {
  page?: number;
  search?: string;
}

export type StudyGroupInputs = {
  name: string;
  leader?: string;
  time?: string;
  subject?: string;
}

export default class StudyGroupAPI extends API {
  static baseUrl: string = 'api/v1/study-groups';

  static getAll(filters: StudyGroupFilters = {}): AxiosPromise {
    return this.get(this.baseUrl, filters);
  }

  static remove(id: number): AxiosPromise {
    return this.delete(`${this.baseUrl}/${id}`)
  }

  static update(id: number, body: Partial<StudyGroupInputs>): AxiosPromise {
    return this.put(`${this.baseUrl}/${id}`, body)
  }

  static create(form: StudyGroupInputs): AxiosPromise {
    return this.post(this.baseUrl, form)
  }
}