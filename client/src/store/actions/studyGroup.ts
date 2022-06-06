import { Dispatch } from 'react';

import {
  ADD_STUDY_GROUPS,
  ADD_STUDY_GROUP,
  UPDATE_STUDY_GROUP,
  DELETE_STUDY_GROUP,
  ADD_STUDENT_TO_STUDY_GROUP,
  REMOVE_STUDENT_FROM_STUDY_GROUP,
  Action
} from '../types';

export const addStudyGroups = (groups: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: ADD_STUDY_GROUPS,
    payload: groups,
  });
};

export const addStudyGroup = (group: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: ADD_STUDY_GROUP,
    payload: group
  })
};

export const deleteStudyGroup = (id: number, dispatch: Dispatch<Action<number>>) => {
  dispatch({
    type: DELETE_STUDY_GROUP,
    payload: id
  })
};

export const updateStudyGroup = (group: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: UPDATE_STUDY_GROUP,
    payload: group
  })
};

export const addStudentToStudyGroup = (payload: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: ADD_STUDENT_TO_STUDY_GROUP,
    payload
  })
}

export const removeStudentFromStudyGroup = (payload: any, dispatch: Dispatch<Action<any>>) => {
  dispatch({
    type: REMOVE_STUDENT_FROM_STUDY_GROUP,
    payload
  })
}