import { fill } from 'lodash';

import {
  ADD_STUDY_GROUPS,
  ADD_STUDY_GROUP,
  DELETE_STUDY_GROUP,
  UPDATE_STUDY_GROUP,
  ADD_STUDENT_TO_STUDY_GROUP,
  REMOVE_STUDENT_FROM_STUDY_GROUP,
  Action,
} from '../types';
import initialState, { StudyGroupsState } from '../initialState';
import { GetStudyGroupResponse } from '../../services/studyGroup';
import { GetStudentResponse } from '../../services/student';


type StudyGroupReducerFunction<P = any> = (state: StudyGroupsState, payload: P) => StudyGroupsState;
type LeaveJoinPayload = {
  id: number,
  student: GetStudentResponse
}

const addStudyGroups: StudyGroupReducerFunction<GetStudyGroupResponse> = (state, studyGroups) => {
  return {
    ...state,
    ...studyGroups,
  };
};

const deleteStudyGroup: StudyGroupReducerFunction<number> = (state, id: number) => {
  return {
    ...state,
    count: state.count - 1,
    data: state.data.filter((item) => item.id !== id),
  };
};

const addStudyGroup: StudyGroupReducerFunction<GetStudyGroupResponse> = (state, studyGroup) => {
  return {
    ...state,
    count: state.count + 1,
    data: [studyGroup, ...state.data],
  };
};

const updateStudyGroup: StudyGroupReducerFunction<GetStudyGroupResponse> = (state, studyGroup) => {
  const index = state.data.findIndex((item) => item.id === studyGroup.id);
  if (index === -1) {
    return state;
  }
  return {
    ...state,
    data: fill(state.data, studyGroup, index, index + 1),
  };
};

const addStudentToStudyGroup: StudyGroupReducerFunction<LeaveJoinPayload> = (state, payload) => {
  const index = state.data.findIndex((item) => item.id === payload.id);
  if (index === -1) {
    return state;
  }
  return {
    ...state,
    data: [
      ...fill(
        state.data,
        {
          ...state.data[index],
          enrolled: [
            payload,
            ...state.data[index].enrolled.filter(
              ({ student }) => student.id !== payload.student.id
            ),
          ],
        },
        index,
        index + 1
      ),
    ],
  };
};

const removeStudentFromStudyGroup: StudyGroupReducerFunction<LeaveJoinPayload> = (state, payload) => {
  const index = state.data.findIndex((item) => item.id === payload.id);
  if (index === -1) {
    return state;
  }
  return {
    ...state,
    data: [
      ...fill(
        state.data,
        {
          ...state.data[index],
          enrolled: [
            ...state.data[index].enrolled.filter(
              ({ student }) => student.id !== payload.student.id
            ),
          ],
        },
        index,
        index + 1
      ),
    ],
  };
};

export default function reducer(
  state: StudyGroupsState = initialState.studyGroups,
  { payload, type }: Action
) {
  switch (type) {
    case ADD_STUDY_GROUPS:
      return addStudyGroups(state, payload);
    case DELETE_STUDY_GROUP:
      return deleteStudyGroup(state, payload);
    case ADD_STUDY_GROUP:
      return addStudyGroup(state, payload);
    case UPDATE_STUDY_GROUP:
      return updateStudyGroup(state, payload);
    case ADD_STUDENT_TO_STUDY_GROUP:
      return addStudentToStudyGroup(state, payload);
    case REMOVE_STUDENT_FROM_STUDY_GROUP:
      return removeStudentFromStudyGroup(state, payload);
    default:
      return state;
  }
}
