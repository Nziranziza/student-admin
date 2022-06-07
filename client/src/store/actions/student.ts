import { 
  ADD_STUDENTS, 
  ADD_STUDENT, 
  DELETE_STUDENT, 
  UPDATE_STUDENT,
  ActionFunction
} from '../types';
import { GetStudentResponse, GetAllStudentsResponse } from '../../services/student';


export const addStudents: ActionFunction<GetAllStudentsResponse> = (students, dispatch) => {
  dispatch({
    type: ADD_STUDENTS,
    payload: students
  })
};

export const addStudent: ActionFunction<GetStudentResponse> = (student, dispatch) => {
  dispatch({
    type: ADD_STUDENT,
    payload: student
  })
};

export const deleteStudent: ActionFunction<number> = (id, dispatch) => {
  dispatch({
    type: DELETE_STUDENT,
    payload: id
  })
};

export const updateStudent: ActionFunction<GetStudentResponse>  = (student, dispatch) => {
  dispatch({
    type: UPDATE_STUDENT,
    payload: student,
  })
};
