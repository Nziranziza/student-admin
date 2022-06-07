import { GetAllStudentsResponse } from '../services/student';
import { GetAllStudyGroupResponse } from '../services/studyGroup';

export type StudentsState = GetAllStudentsResponse;
export type StudyGroupsState = GetAllStudyGroupResponse;

export type State = {
  students: StudentsState,
  studyGroups: StudyGroupsState
}
const initialState: State = {
  students: {
    page: 1,
    pages: 1,
    pageSize: 10,
    count: 0,
    data: []
  },
  studyGroups: {
    page: 1,
    pages: 1,
    pageSize: 10,
    count: 0,
    studentCount: 0,
    data: []
  }
};

export default initialState;
