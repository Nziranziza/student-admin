import { fill } from 'lodash';

import {
  ADD_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  Action
} from '../types';
import initialState, { StudentsState } from '../initialState';
import { GetStudentResponse } from '../../services/student';

type StudentReducerFunction<P = any> = (state: StudentsState, payload: P) => StudentsState;

const getStudents: StudentReducerFunction<GetStudentResponse> = (state, students) => {
  return {
    ...state,
    ...students,
  };
};

const addStudent: StudentReducerFunction<GetStudentResponse> = (state, student) => {
  return {
    ...state,
    count: state.count + 1,
    data: [student, ...state.data],
  };
};

const deleteStudent: StudentReducerFunction<number> = (state, id) => {
  return {
    ...state,
    count: state.count - 1,
    data: state.data.filter((item) => item.id !== id),
  };
};

const updateStudent: StudentReducerFunction<GetStudentResponse> = (state, student) => {
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
  state: StudentsState = initialState.students,
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
