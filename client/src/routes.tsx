import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
import Students from './pages/students';
import StudyGroups from './pages/study-groups';

export default function AppRoutes() {
  return<Routes>
      <Route path="/" element={<Layout />}>
        <Route path="students" element={<Students />} />
        <Route path="study-groups" element={<StudyGroups />} />
      </Route>
    </Routes>;
}
