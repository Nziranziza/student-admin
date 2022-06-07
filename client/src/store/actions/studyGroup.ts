import {
  ADD_STUDY_GROUPS,
  ADD_STUDY_GROUP,
  UPDATE_STUDY_GROUP,
  DELETE_STUDY_GROUP,
  ADD_STUDENT_TO_STUDY_GROUP,
  REMOVE_STUDENT_FROM_STUDY_GROUP,
  ActionFunction
} from '../types';

import { GetAllStudyGroupResponse, GetStudyGroupResponse, Enrolled } from '../../services/studyGroup';

export const addStudyGroups: ActionFunction<GetAllStudyGroupResponse> = (groups, dispatch) => {
  dispatch({
    type: ADD_STUDY_GROUPS,
    payload: groups,
  });
};

export const addStudyGroup: ActionFunction<GetStudyGroupResponse> = (group, dispatch) => {
  dispatch({
    type: ADD_STUDY_GROUP,
    payload: group
  })
};

export const deleteStudyGroup: ActionFunction<number> = (id, dispatch) => {
  dispatch({
    type: DELETE_STUDY_GROUP,
    payload: id
  })
};

export const updateStudyGroup: ActionFunction<GetStudyGroupResponse> = (group, dispatch) => {
  dispatch({
    type: UPDATE_STUDY_GROUP,
    payload: group
  })
};

export const addStudentToStudyGroup: ActionFunction<Enrolled> = (enrollment, dispatch) => {
  dispatch({
    type: ADD_STUDENT_TO_STUDY_GROUP,
    payload: enrollment
  })
}

export const removeStudentFromStudyGroup: ActionFunction<Enrolled> = (enrollment, dispatch) => {
  dispatch({
    type: REMOVE_STUDENT_FROM_STUDY_GROUP,
    payload: enrollment
  })
}