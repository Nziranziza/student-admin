import { AxiosPromise } from 'axios';

import API from './api';

export type StudentFilters = {
  page?: number;
  search?: string;
  'groups'?: string[]
}

export type Gender = 'Male' | 'Female'

export type StudentInputs = {
  name: string,
  sex: Gender,
  placeOfBirth: string,
  dateOfBirth: string,
  email: string
}

export default class StudentAPI extends API {
  static baseUrl: string = 'api/v1/students';
  static getAll(filters: StudentFilters = {}): AxiosPromise {
    return this.get(this.baseUrl, filters);
  }

  static create(inputs: StudentInputs): AxiosPromise {
    return this.post(this.baseUrl, inputs)
  }

  static remove(id: number): AxiosPromise {
    return this.delete(`${this.baseUrl}/${id}`)
  }

  static update(id: number, body: Partial<StudentInputs>): AxiosPromise {
    return this.put(`${this.baseUrl}/${id}`, body)
  }
}
