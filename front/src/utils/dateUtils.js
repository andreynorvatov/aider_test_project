/**
 * Форматирование даты и времени в формат ДД.ММ.ГГГГ ЧЧ:ММ
 * @param {string|null} dateString - ISO строка даты
 * @returns {string} - Отформатированная дата или "—"
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Преобразование ISO даты в формат для input datetime-local
 * @param {string|null} dateString - ISO строка даты
 * @returns {string} - Дата в формате YYYY-MM-DDTHH:MM
 */
export const toDateTimeLocal = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
