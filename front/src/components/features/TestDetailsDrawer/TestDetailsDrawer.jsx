import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
 * Преобразование ISO даты в формат для input datetime-local
 * @param {string|null} dateString - ISO строка даты
 * @returns {string} - Дата в формате YYYY-MM-DDTHH:MM
 */
const toDateTimeLocal = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
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

// Список доступных статусов
const STATUS_OPTIONS = [
  'Черновик',
  'Запланирован',
  'В процессе',
  'Успешно',
  'Завершен с ошибками',
  'Отменен',
];

export function TestDetailsDrawer({ test, onClose, onSave }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  // Инициализация формы при изменении теста
  useEffect(() => {
    if (test) {
      setFormData({
        name: test.name,
        status: test.status,
        startTime: test.startTime,
        endTime: test.endTime,
        initiator: test.initiator,
        virtualUsers: test.loadParams.virtualUsers,
        duration: test.loadParams.duration,
        rps: test.loadParams.rps,
        rampUp: test.loadParams.rampUp || '',
        description: test.description || '',
      });
    }
    setIsEditing(false);
  }, [test]);

  if (!test || !formData) return null;

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик изменения числовых полей
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value),
    }));
  };

  // Вход в режим редактирования
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Отмена редактирования
  const handleCancelClick = () => {
    // Сбрасываем форму к исходным данным
    setFormData({
      name: test.name,
      status: test.status,
      startTime: test.startTime,
      endTime: test.endTime,
      initiator: test.initiator,
      virtualUsers: test.loadParams.virtualUsers,
      duration: test.loadParams.duration,
      rps: test.loadParams.rps,
      rampUp: test.loadParams.rampUp || '',
      description: test.description || '',
    });
    setIsEditing(false);
  };

  // Сохранение изменений
  const handleSaveClick = () => {
    const updatedTest = {
      ...test,
      name: formData.name,
      status: formData.status,
      startTime: formData.startTime || null,
      endTime: formData.endTime || null,
      initiator: formData.initiator,
      loadParams: {
        virtualUsers: formData.virtualUsers,
        duration: formData.duration,
        rps: formData.rps,
        rampUp: formData.rampUp || null,
      },
      description: formData.description,
    };
    
    onSave(updatedTest);
    setIsEditing(false);
  };

  // Открыть на всю страницу
  const handleExpandClick = () => {
    navigate(`/tests/${test.id}`);
  };

  return (
    <div className="test-drawer">
      <div className="test-drawer__header">
        <h2 className="test-drawer__title">
          {isEditing ? 'Редактирование теста' : `Детали теста #${test.id}`}
        </h2>
        <div className="test-drawer__header-actions">
          <button 
            className="test-drawer__expand" 
            onClick={handleExpandClick} 
            aria-label="Развернуть на всю страницу"
            title="Открыть на всю страницу"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
          <button className="test-drawer__close" onClick={onClose} aria-label="Закрыть">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="test-drawer__content">
        {/* Основная информация */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Основная информация</h3>
          
          {isEditing ? (
            <>
              <div className="test-drawer__field">
                <label className="test-drawer__label" htmlFor="name">Наименование:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="test-drawer__input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="test-drawer__field">
                <label className="test-drawer__label" htmlFor="status">Статус:</label>
                <select
                  id="status"
                  name="status"
                  className="test-drawer__select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="test-drawer__field">
                <label className="test-drawer__label" htmlFor="startTime">Время запуска:</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  className="test-drawer__input"
                  value={toDateTimeLocal(formData.startTime)}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="test-drawer__field">
                <label className="test-drawer__label" htmlFor="endTime">Время завершения:</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  className="test-drawer__input"
                  value={toDateTimeLocal(formData.endTime)}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </section>

        {/* Инициатор */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Инициатор</h3>
          
          {isEditing ? (
            <div className="test-drawer__field">
              <label className="test-drawer__label" htmlFor="initiator">Кто запустил:</label>
              <input
                type="text"
                id="initiator"
                name="initiator"
                className="test-drawer__input"
                value={formData.initiator}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="test-drawer__field">
              <span className="test-drawer__label">Кто запустил:</span>
              <span className="test-drawer__value">{test.initiator}</span>
            </div>
          )}
        </section>

        {/* Параметры нагрузки */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Параметры нагрузки</h3>
          
          {isEditing ? (
            <div className="test-drawer__params">
              <div className="test-drawer__param">
                <label className="test-drawer__param-label" htmlFor="virtualUsers">
                  Число виртуальных пользователей:
                </label>
                <input
                  type="number"
                  id="virtualUsers"
                  name="virtualUsers"
                  className="test-drawer__param-input"
                  value={formData.virtualUsers}
                  onChange={handleNumberChange}
                  min="1"
                />
              </div>
              <div className="test-drawer__param">
                <label className="test-drawer__param-label" htmlFor="duration">Продолжительность:</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  className="test-drawer__param-input"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="например: 1 час"
                />
              </div>
              <div className="test-drawer__param">
                <label className="test-drawer__param-label" htmlFor="rps">RPS (запросов в секунду):</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  className="test-drawer__param-input"
                  value={formData.rps}
                  onChange={handleNumberChange}
                  min="1"
                />
              </div>
              <div className="test-drawer__param">
                <label className="test-drawer__param-label" htmlFor="rampUp">Ramp-up время:</label>
                <input
                  type="text"
                  id="rampUp"
                  name="rampUp"
                  className="test-drawer__param-input"
                  value={formData.rampUp}
                  onChange={handleInputChange}
                  placeholder="например: 5 минут"
                />
              </div>
            </div>
          ) : (
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
          )}
        </section>

        {/* Детальное описание */}
        <section className="test-drawer__section">
          <h3 className="test-drawer__section-title">Детальное описание</h3>
          
          {isEditing ? (
            <textarea
              id="description"
              name="description"
              className="test-drawer__textarea"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              placeholder="Введите описание теста..."
            />
          ) : (
            <div className="test-drawer__description">
              {test.description || 'Описание отсутствует'}
            </div>
          )}
        </section>
      </div>

      <div className="test-drawer__footer">
        {isEditing ? (
          <div className="test-drawer__edit-actions">
            <button className="btn btn--secondary" onClick={handleCancelClick}>
              Отмена
            </button>
            <button className="btn btn--primary" onClick={handleSaveClick}>
              Сохранить
            </button>
          </div>
        ) : (
          <>
            <button className="btn btn--primary test-drawer__edit-btn" onClick={handleEditClick}>
              <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Редактировать
            </button>
            <button className="btn btn--secondary test-drawer__close-btn" onClick={onClose}>
              Закрыть
            </button>
          </>
        )}
      </div>
    </div>
  );
}
