import { useTheme } from '../../../hooks/useTheme';
import './ThemeToggle.scss';

/**
 * Компонент переключения темы
 * Отображает кнопку для переключения между светлой и темной темой
 */
export function ThemeToggle({ variant = 'icon' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'switch') {
    return (
      <label className="theme-toggle theme-toggle--switch">
        <span className="theme-toggle__label">Тема</span>
        <div className="theme-toggle__switch">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
          />
          <span className="theme-toggle__slider">
            <span className="theme-toggle__slider-icon theme-toggle__slider-icon--sun">☀️</span>
            <span className="theme-toggle__slider-icon theme-toggle__slider-icon--moon">🌙</span>
          </span>
        </div>
      </label>
    );
  }

  // Вариант с иконкой по умолчанию
  return (
    <button
      className="theme-toggle theme-toggle--icon"
      onClick={toggleTheme}
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      <span className="theme-toggle__icon">
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
