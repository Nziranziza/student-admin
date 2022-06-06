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
import initialState from '../initialState';

const addStudyGroups = (state: any, studyGroups: any) => {
  return {
    ...state,
    ...studyGroups,
  };
};

const deleteStudyGroup = (state: any, id: number) => {
  return {
    ...state,
    count: state.count - 1,
    data: state.data.filter((item: any) => item.id !== id),
  };
};

const addStudyGroup = (state: any, studyGroup: any) => {
  return {
    ...state,
    count: state.count + 1,
    data: [studyGroup, ...state.data],
  };
};

const updateStudyGroup = (state: any, studyGroup: any) => {
  const index = state.data.findIndex((item: any) => item.id === studyGroup.id);
  if (index === -1) {
    return state;
  }
  return {
    ...state,
    data: fill(state.data, studyGroup, index, index + 1),
  };
};

const addStudentToStudyGroup = (state: any, payload: any) => {
  const index = state.data.findIndex((item: any) => item.id === payload.id);
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
            { Student: payload.student },
            ...state.data[index].enrolled.filter(
              ({ Student }: any) => Student.id !== payload.student.id
            ),
          ],
        },
        index,
        index + 1
      ),
    ],
  };
};

const removeStudentFromStudyGroup = (state: any, payload: any) => {
  const index = state.data.findIndex((item: any) => item.id === payload.id);
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
              ({ Student }: any) => Student.id !== payload.student.id
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
  state: any = initialState.studyGroups,
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
