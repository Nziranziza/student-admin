import { ADD_STUDENTS, ADD_STUDENT } from '../types';
import initialState from '../initialState';

const getStudents = (state: any, students: any) => {
  return {
    ...state,
    ...students
  }
};

const addStudent = (state: any, student: any) => {
  return {
    ...state,
      ...state.students,
      data: [
        student,
        ...state.data
      ]
  }
}

export default function reducer(state: any = initialState.students, action: any) {
  switch(action.type) {
    case ADD_STUDENTS:
      return getStudents(state, action.payload);
    case ADD_STUDENT:
      return addStudent(state, action.payload)
    default:
      return state;
  }
}