import { ADD_STUDENTS, ADD_STUDENT } from "../types";
const getStudents = (state: any, students: any) => {
  return {
    ...state,
    students
  }
};

const addStudent = (state: any, student: any) => {
  return {
    ...state,
    students: {
      ...state.students,
      data: [
        student,
        ...state.students.data
      ]
    }
  }
}

export default function reducer(state: any, action: any) {
  switch(action.type) {
    case ADD_STUDENTS:
      return getStudents(state, action.payload);
    case ADD_STUDENT:
      return addStudent(state, action.payload)
    default:
      return state;
  }
}