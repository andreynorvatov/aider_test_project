import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.scss';

const SIDEBAR_EXPANDED_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 60;

export function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = useCallback((collapsed) => {
    setIsSidebarCollapsed(collapsed);
  }, []);

  const contentMargin = isSidebarCollapsed 
    ? `${SIDEBAR_COLLAPSED_WIDTH}px` 
    : `${SIDEBAR_EXPANDED_WIDTH}px`;

  return (
    <div className="layout">
      <Sidebar onCollapseChange={handleSidebarCollapseChange} />
      <main 
        className="layout__content"
        style={{ marginLeft: contentMargin }}
      >
        <Outlet />
      </main>
    </div>
  );
}
