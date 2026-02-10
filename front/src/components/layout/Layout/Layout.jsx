import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.scss';

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
}
