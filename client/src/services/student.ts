import { AxiosPromise } from 'axios';

import API from './api';
import { GetStudyGroupResponse } from './studyGroup';

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
};

export type Enrollment = {
  id: number;
  studyGroup: GetStudyGroupResponse
}

export interface GetStudentResponse extends StudentInputs {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  enrollments: Enrollment[]
}
export interface GetAllStudentsResponse {
  page: number;
  pages: number;
  pageSize: number;
  count: number;
  data: GetStudentResponse[]
}

export default class StudentAPI extends API {
  static baseUrl: string = 'api/v1/students';
  static getAll(filters: StudentFilters = {}): Promise<GetAllStudentsResponse> {
    return this.get(this.baseUrl, filters);
  }

  static create(inputs: StudentInputs): Promise<GetStudentResponse> {
    return this.post(this.baseUrl, inputs)
  }

  static remove(id: number): AxiosPromise {
    return this.delete(`${this.baseUrl}/${id}`)
  }

  static update(id: number, body: Partial<StudentInputs>): Promise<GetStudentResponse> {
    return this.put(`${this.baseUrl}/${id}`, body)
  }
}
