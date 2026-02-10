import './TestsTable.scss';

/**
 * Форматирование даты и времени в формат ДД.ММ.ГГГГ ЧЧ:ММ
 * @param {string|null} dateString - ISO строка даты
 * @returns {string} - Отформатированная дата или "—"
 */
const formatDateTime = (dateString) => {
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
 * Получение CSS-класса для статуса
 * @param {string} status - Статус теста
 * @returns {string} - CSS-класс
 */
const getStatusClass = (status) => {
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

export function TestsTable({ tests, selectedTestId, onRowClick }) {
  return (
    <div className="tests-table-container">
      <table className="tests-table">
        <thead className="tests-table__head">
          <tr>
            <th className="tests-table__th tests-table__th--id">ID</th>
            <th className="tests-table__th tests-table__th--name">Наименование теста</th>
            <th className="tests-table__th tests-table__th--status">Статус</th>
            <th className="tests-table__th tests-table__th--time">Время запуска</th>
            <th className="tests-table__th tests-table__th--time">Время завершения</th>
          </tr>
        </thead>
        <tbody className="tests-table__body">
          {tests.length === 0 ? (
            <tr className="tests-table__empty-row">
              <td colSpan={5} className="tests-table__empty-cell">
                Тесты не найдены
              </td>
            </tr>
          ) : (
            tests.map(test => (
              <tr
                key={test.id}
                className={`tests-table__row ${selectedTestId === test.id ? 'tests-table__row--selected' : ''}`}
                onClick={() => onRowClick(test.id)}
              >
                <td className="tests-table__td tests-table__td--id">{test.id}</td>
                <td className="tests-table__td tests-table__td--name">{test.name}</td>
                <td className="tests-table__td">
                  <span className={`status-badge ${getStatusClass(test.status)}`}>
                    {test.status}
                  </span>
                </td>
                <td className="tests-table__td tests-table__td--time">
                  {formatDateTime(test.startTime)}
                </td>
                <td className="tests-table__td tests-table__td--time">
                  {formatDateTime(test.endTime)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
