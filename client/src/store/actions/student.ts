import { ADD_STUDENTS, ADD_STUDENT } from "../types"
export const addStudents = (students: any, dispatch: any) => {
  dispatch({
    type: ADD_STUDENTS,
    payload: students
  })
};

export const addStudent = (student: any, dispatch: any) => {
  dispatch({
    type: ADD_STUDENT,
    payload: student
  })
}