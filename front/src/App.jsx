import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { TestPortalPage } from './pages/TestPortal/TestPortalPage';
import { TestDetailsPage } from './pages/TestDetails/TestDetailsPage';
import UtilitiesPage from './pages/Utilities/UtilitiesPage';
import ReferencePage from './pages/Reference/ReferencePage';
import { TestPage } from './pages/Reference/TestPage/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tests" element={<TestPortalPage />} />
        <Route path="tests/:id" element={<TestDetailsPage />} />
        <Route path="utilities" element={<UtilitiesPage />} />
        <Route path="reference" element={<ReferencePage />} />
        <Route path="reference/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
