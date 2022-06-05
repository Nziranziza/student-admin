import { ADD_STUDY_GROUPS } from '../types/studyGroup';

export const addStudyGroups = (groups: any, dispatch: any) => {
  dispatch({
    type: ADD_STUDY_GROUPS,
    payload: groups
  })
};

