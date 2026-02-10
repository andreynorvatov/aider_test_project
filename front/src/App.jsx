import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { TestPortalPage } from './pages/TestPortal/TestPortalPage';
import UtilitiesPage from './pages/Utilities/UtilitiesPage';
import ReferencePage from './pages/Reference/ReferencePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tests" element={<TestPortalPage />} />
        <Route path="utilities" element={<UtilitiesPage />} />
        <Route path="reference" element={<ReferencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
