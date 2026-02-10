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

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Меню</h2>
      </div>
      <nav className="sidebar__nav">
        {menuItems.map((section, index) => (
          <div key={index} className="sidebar__section">
            <h3 className="sidebar__section-title">{section.section}</h3>
            <ul className="sidebar__list">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="sidebar__item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/reference'}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                    }
                  >
                    {item.label}
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
