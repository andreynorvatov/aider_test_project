/**
 * Получение CSS-класса для статуса
 * @param {string} status - Статус теста
 * @returns {string} - CSS-класс
 */
export const getStatusClass = (status) => {
  const statusClasses = {
    'Черновик': 'status-badge--draft',
    'Запланирован': 'status-badge--planned',
    'В процессе': 'status-badge--in-progress',
    'Успешно': 'status-badge--success',
    'Завершен с ошибками': 'status-badge--error',
    'Отменен': 'status-badge--canceled',
  };
  return statusClasses[status] || 'status-badge--default';
};

// Список доступных статусов
export const STATUS_OPTIONS = [
  'Черновик',
  'Запланирован',
  'В процессе',
  'Успешно',
  'Завершен с ошибками',
  'Отменен',
];
