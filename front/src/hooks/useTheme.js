import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Хук для доступа к функциональности темы
 * 
 * @returns {Object} Объект с методами и состоянием темы
 * @property {string} theme - Текущая тема ('light' | 'dark')
 * @property {Function} toggleTheme - Переключение между темами
 * @property {Function} setTheme - Установка конкретной темы
 * @property {boolean} isDark - Является ли текущая тема темной
 * 
 * @example
 * const { theme, toggleTheme, isDark } = useTheme();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     {isDark ? 'Светлая тема' : 'Темная тема'}
 *   </button>
 * );
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  
  return context;
}

export default useTheme;
