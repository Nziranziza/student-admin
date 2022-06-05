import { ADD_STUDY_GROUPS } from '../types';
import initialState from '../initialState';

const addStudyGroups = (state: any, studyGroups: any) => {
  return studyGroups
};

export default function reducer(state: any = initialState.studyGroups, action: any) {
  switch(action.type) {
    case ADD_STUDY_GROUPS:
      return addStudyGroups(state, action.payload);
    default:
      return state;
  }
}