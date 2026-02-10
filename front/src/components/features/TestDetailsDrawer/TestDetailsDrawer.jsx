import './TestDetailsDrawer.scss';

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

export function TestDetailsDrawer({ test, onClose }) {
  if (!test) return null;

  return (
    <div className="test-drawer">
      <div className="test-drawer__header">
        <h2 className="test-drawer__title">
          Детали теста #{test.id}
        </h2>
        <button className="test-drawer__close" onClick={onClose} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="test-drawer__content">
        {/* Основная информация */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Основная информация</h3>
          <div className="test-drawer__field">
            <span className="test-drawer__label">Наименование:</span>
            <span className="test-drawer__value test-drawer__value--name">{test.name}</span>
          </div>
          <div className="test-drawer__field">
            <span className="test-drawer__label">Статус:</span>
            <span className={`status-badge ${getStatusClass(test.status)}`}>
              {test.status}
            </span>
          </div>
          <div className="test-drawer__field">
            <span className="test-drawer__label">Время запуска:</span>
            <span className="test-drawer__value">{formatDateTime(test.startTime)}</span>
          </div>
          <div className="test-drawer__field">
            <span className="test-drawer__label">Время завершения:</span>
            <span className="test-drawer__value">{formatDateTime(test.endTime)}</span>
          </div>
        </section>

        {/* Инициатор */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Инициатор</h3>
          <div className="test-drawer__field">
            <span className="test-drawer__label">Кто запустил:</span>
            <span className="test-drawer__value">{test.initiator}</span>
          </div>
        </section>

        {/* Параметры нагрузки */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Параметры нагрузки</h3>
          <div className="test-drawer__params">
            <div className="test-drawer__param">
              <span className="test-drawer__param-label">Число виртуальных пользователей:</span>
              <span className="test-drawer__param-value">{test.loadParams.virtualUsers}</span>
            </div>
            <div className="test-drawer__param">
              <span className="test-drawer__param-label">Продолжительность:</span>
              <span className="test-drawer__param-value">{test.loadParams.duration}</span>
            </div>
            <div className="test-drawer__param">
              <span className="test-drawer__param-label">RPS (запросов в секунду):</span>
              <span className="test-drawer__param-value">{test.loadParams.rps}</span>
            </div>
            {test.loadParams.rampUp && (
              <div className="test-drawer__param">
                <span className="test-drawer__param-label">Ramp-up время:</span>
                <span className="test-drawer__param-value">{test.loadParams.rampUp}</span>
              </div>
            )}
          </div>
        </section>

        {/* Детальное описание */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Детальное описание</h3>
          <div className="test-drawer__description">
            {test.description || 'Описание отсутствует'}
          </div>
        </section>
      </div>

      <div className="test-drawer__footer">
        <button className="btn btn--secondary test-drawer__close-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
