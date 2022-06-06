import { fill } from 'lodash';

import {
  ADD_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  Action
} from '../types';
import initialState from '../initialState';

const getStudents = (state: any, students: any) => {
  return {
    ...state,
    ...students,
  };
};

const addStudent = (state: any, student: any) => {
  return {
    ...state,
    count: state.count + 1,
    data: [student, ...state.data],
  };
};

const deleteStudent = (state: any, id: number) => {
  return {
    ...state,
    count: state.count - 1,
    data: state.data.filter((item: any) => item.id !== id),
  };
};

const updateStudent = (state: any, student: any) => {
  const index = state.data.findIndex((item: any) => item.id === student.id);
  if (index === -1) {
    return state;
  }
  return {
    ...state,
    data: fill(state.data, student, index, index + 1),
  };
};

export default function reducer(
  state: any = initialState.students,
  { payload, type }: Action
) {
  switch (type) {
    case ADD_STUDENTS:
      return getStudents(state, payload);
    case ADD_STUDENT:
      return addStudent(state, payload);
    case DELETE_STUDENT:
      return deleteStudent(state, payload);
    case UPDATE_STUDENT:
      return updateStudent(state, payload);
    default:
      return state;
  }
}
