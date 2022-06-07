import { AxiosPromise } from 'axios';

import API from './api';
import { GetStudentResponse } from './student';

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

export type Enrolled = {
  id: number,
  student: GetStudentResponse
}

export interface GetStudyGroupResponse extends StudyGroupInputs {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  enrolled: Enrolled[]
}

export interface GetAllStudyGroupResponse {
  page: number;
  pages: number;
  pageSize: number;
  count: number;
  studentCount: number;
  data: GetStudyGroupResponse[]
}

export interface Enrollment {
  id: number;
  studyGroupId: number;
  updatedAt: Date;
  createdAt: Date
}

export default class StudyGroupAPI extends API {
  static baseUrl: string = 'api/v1/study-groups';

  static getAll(filters: StudyGroupFilters = {}): Promise<GetAllStudyGroupResponse> {
    return this.get(this.baseUrl, filters);
  }

  static remove(id: number): AxiosPromise {
    return this.delete(`${this.baseUrl}/${id}`)
  }

  static update(id: number, body: Partial<StudyGroupInputs>): Promise<GetStudyGroupResponse> {
    return this.put(`${this.baseUrl}/${id}`, body)
  }

  static create(form: StudyGroupInputs): Promise<GetStudyGroupResponse> {
    return this.post(this.baseUrl, form)
  }

  static removeMember(id: number, studentId: number): Promise<null> {
    return this.delete(`${this.baseUrl}/${id}/leave`, {}, {
      studentId
    })
  };

  static addMember(id: number, studentId: number): Promise<Enrollment> {
    return this.post(`${this.baseUrl}/${id}/join`, {
      studentId
    })
  }
}