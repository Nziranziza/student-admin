import { combineReducers } from 'redux';

import studentReducer from './student';
import StudyGroupReducer from './studyGroup';

const reducer = combineReducers({
  students: studentReducer,
  studyGroups: StudyGroupReducer,
});

export default reducer;
