import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
import { StudyGroups, Students } from './pages';

export default function AppRoutes(): JSX.Element {
  return <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Students />} />
      <Route path="study-groups" element={<StudyGroups />} />
    </Route>
  </Routes>;
}
