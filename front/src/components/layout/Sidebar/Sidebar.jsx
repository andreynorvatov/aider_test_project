import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const menuItems = [
  {
    section: 'Дашборды',
    items: [
      { label: 'Портал тестов', path: '/tests' }
    ]
  },
  {
    section: 'Утилиты',
    items: [
      { label: 'Утилиты', path: '/utilities' }
    ]
  },
  {
    section: 'Справочная информация',
    items: [
      { label: 'Справочная информация', path: '/reference' },
      { label: 'Тестовая страница', path: '/reference/test' }
    ]
  }
];

const COLLAPSE_BREAKPOINT = 768;
const SIDEBAR_EXPANDED_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 60;

export function Sidebar({ onCollapseChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Функция для проверки ширины окна и автоматического сворачивания
  const checkWidth = useCallback(() => {
    const shouldCollapse = window.innerWidth < COLLAPSE_BREAKPOINT;
    setIsCollapsed(prevState => {
      if (prevState !== shouldCollapse) {
        return shouldCollapse;
      }
      return prevState;
    });
  }, []);

  // Обработчик изменения размера окна
  useEffect(() => {
    checkWidth(); // Проверка при монтировании
    
    let timeoutId = null;
    const handleResize = () => {
      // Debounce для оптимизации
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(checkWidth, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [checkWidth]);

  // Уведомляем родительский компонент об изменении состояния
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  // Ручное переключение
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <aside 
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}
      style={{ 
        width: isCollapsed ? `${SIDEBAR_COLLAPSED_WIDTH}px` : `${SIDEBAR_EXPANDED_WIDTH}px` 
      }}
    >
      <div className="sidebar__header">
        <h2 className="sidebar__title">
          {isCollapsed ? '' : 'Меню'}
        </h2>
        <button 
          className="sidebar__toggle" 
          onClick={toggleCollapse}
          title={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          <span className="sidebar__toggle-icon">
            {isCollapsed ? '→' : '←'}
          </span>
        </button>
      </div>
      <nav className="sidebar__nav">
        {menuItems.map((section, index) => (
          <div key={index} className="sidebar__section">
            <h3 className="sidebar__section-title">
              {isCollapsed ? section.section.charAt(0) : section.section}
            </h3>
            <ul className="sidebar__list">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="sidebar__item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/reference'}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                    }
                    title={isCollapsed ? item.label : ''}
                  >
                    {isCollapsed ? item.label.charAt(0) : item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
