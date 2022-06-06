import { Dispatch } from 'react';
import { 
  ADD_STUDENTS, 
  ADD_STUDENT, 
  DELETE_STUDENT, 
  UPDATE_STUDENT 
} from '../types';

type Action<P> = {
  type: string;
  payload: P
}

export const addStudents = (students: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: ADD_STUDENTS,
    payload: students
  })
};

export const addStudent = (student: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: ADD_STUDENT,
    payload: student
  })
};

export const deleteStudent = (id: number, dispatch: Dispatch<Action<number>>) => {
  dispatch({
    type: DELETE_STUDENT,
    payload: id
  })
};

export const updateStudent = (student: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: UPDATE_STUDENT,
    payload: student,
  })
};
