import { Dispatch } from 'react';

import {
  ADD_STUDY_GROUPS,
  ADD_STUDY_GROUP,
  UPDATE_STUDY_GROUP,
  DELETE_STUDY_GROUP,
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
}