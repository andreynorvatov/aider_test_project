import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

// Ключ для хранения темы в localStorage
const THEME_STORAGE_KEY = 'app-theme';

// Доступные темы
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Создаем контекст с значениями по умолчанию
export const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
});

// Хук для определения системной темы
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }
  return THEMES.LIGHT;
};

// Хук для получения сохраненной темы
const getSavedTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(THEME_STORAGE_KEY);
  }
  return null;
};

/**
 * Провайдер темы
 * Управляет состоянием темы и предоставляет методы для её изменения
 */
export function ThemeProvider({ children, defaultTheme = null }) {
  // Инициализация темы
  const getInitialTheme = useCallback(() => {
    // Приоритет: сохраненная тема -> переданная defaultTheme -> системная тема -> светлая
    const savedTheme = getSavedTheme();
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    if (defaultTheme) {
      return defaultTheme;
    }
    return getSystemTheme();
  }, [defaultTheme]);

  const [theme, setThemeState] = useState(getInitialTheme);

  // Применение темы к документу
  useEffect(() => {
    const root = document.documentElement;
    
    // Устанавливаем атрибут data-theme
    root.setAttribute('data-theme', theme);
    
    // Также добавляем класс для совместимости
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Сохраняем в localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Устанавливаем color-scheme для нативных элементов
    root.style.colorScheme = theme;
  }, [theme]);

  // Слушаем изменения системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Автоматически меняем тему только если пользователь не выбрал её явно
      const savedTheme = getSavedTheme();
      if (!savedTheme) {
        setThemeState(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Переключение темы
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  }, []);

  // Установка конкретной темы
  const setTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  // Мемоизированное значение контекста
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      isDark: theme === THEMES.DARK,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
