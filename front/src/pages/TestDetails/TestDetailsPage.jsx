import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '../../data/mockTests';
import './TestDetailsPage.scss';

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

export function TestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  // Загрузка данных теста
  useEffect(() => {
    const foundTest = mockTests.find(t => t.id === parseInt(id));
    if (foundTest) {
      setTest(foundTest);
      setFormData({
        name: foundTest.name,
        status: foundTest.status,
        startTime: foundTest.startTime,
        endTime: foundTest.endTime,
        initiator: foundTest.initiator,
        virtualUsers: foundTest.loadParams.virtualUsers,
        duration: foundTest.loadParams.duration,
        rps: foundTest.loadParams.rps,
        rampUp: foundTest.loadParams.rampUp || '',
        description: foundTest.description || '',
      });
    }
    setIsEditing(false);
  }, [id]);

  if (!test || !formData) {
    return (
      <div className="test-details-page">
        <div className="test-details-page__not-found">
          <h2>Тест не найден</h2>
          <button className="btn btn--primary" onClick={() => navigate('/tests')}>
            Вернуться к списку тестов
          </button>
        </div>
      </div>
    );
  }

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
    
    setTest(updatedTest);
    setIsEditing(false);
    // В реальном приложении здесь был бы API-запрос
    console.log('Сохранение теста:', updatedTest);
  };

  // Возврат к списку тестов
  const handleBackClick = () => {
    navigate('/tests');
  };

  return (
    <div className="test-details-page">
      <div className="test-details-page__header">
        <button className="btn btn--secondary test-details-page__back-btn" onClick={handleBackClick}>
          <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Назад к списку
        </button>
        <h1 className="test-details-page__title">
          {isEditing ? 'Редактирование теста' : `Тест #${test.id}: ${test.name}`}
        </h1>
      </div>

      <div className="test-details-page__content">
        {/* Основная информация */}
        <section className="test-details-page__section">
          <h2 className="test-details-page__section-title">Основная информация</h2>
          
          {isEditing ? (
            <div className="test-details-page__form-grid">
              <div className="test-details-page__field">
                <label className="test-details-page__label" htmlFor="name">Наименование:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="test-details-page__input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="test-details-page__field">
                <label className="test-details-page__label" htmlFor="status">Статус:</label>
                <select
                  id="status"
                  name="status"
                  className="test-details-page__select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="test-details-page__field">
                <label className="test-details-page__label" htmlFor="startTime">Время запуска:</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  className="test-details-page__input"
                  value={toDateTimeLocal(formData.startTime)}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="test-details-page__field">
                <label className="test-details-page__label" htmlFor="endTime">Время завершения:</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  className="test-details-page__input"
                  value={toDateTimeLocal(formData.endTime)}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="test-details-page__info-grid">
              <div className="test-details-page__field">
                <span className="test-details-page__label">Наименование:</span>
                <span className="test-details-page__value test-details-page__value--name">{test.name}</span>
              </div>
              <div className="test-details-page__field">
                <span className="test-details-page__label">Статус:</span>
                <span className={`status-badge ${getStatusClass(test.status)}`}>
                  {test.status}
                </span>
              </div>
              <div className="test-details-page__field">
                <span className="test-details-page__label">Время запуска:</span>
                <span className="test-details-page__value">{formatDateTime(test.startTime)}</span>
              </div>
              <div className="test-details-page__field">
                <span className="test-details-page__label">Время завершения:</span>
                <span className="test-details-page__value">{formatDateTime(test.endTime)}</span>
              </div>
            </div>
          )}
        </section>

        {/* Инициатор */}
        <section className="test-details-page__section">
          <h2 className="test-details-page__section-title">Инициатор</h2>
          
          {isEditing ? (
            <div className="test-details-page__field">
              <label className="test-details-page__label" htmlFor="initiator">Кто запустил:</label>
              <input
                type="text"
                id="initiator"
                name="initiator"
                className="test-details-page__input"
                value={formData.initiator}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="test-details-page__field">
              <span className="test-details-page__label">Кто запустил:</span>
              <span className="test-details-page__value">{test.initiator}</span>
            </div>
          )}
        </section>

        {/* Параметры нагрузки */}
        <section className="test-details-page__section">
          <h2 className="test-details-page__section-title">Параметры нагрузки</h2>
          
          {isEditing ? (
            <div className="test-details-page__params-grid">
              <div className="test-details-page__param">
                <label className="test-details-page__param-label" htmlFor="virtualUsers">
                  Число виртуальных пользователей:
                </label>
                <input
                  type="number"
                  id="virtualUsers"
                  name="virtualUsers"
                  className="test-details-page__param-input"
                  value={formData.virtualUsers}
                  onChange={handleNumberChange}
                  min="1"
                />
              </div>
              <div className="test-details-page__param">
                <label className="test-details-page__param-label" htmlFor="duration">Продолжительность:</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  className="test-details-page__param-input"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="например: 1 час"
                />
              </div>
              <div className="test-details-page__param">
                <label className="test-details-page__param-label" htmlFor="rps">RPS (запросов в секунду):</label>
                <input
                  type="number"
                  id="rps"
                  name="rps"
                  className="test-details-page__param-input"
                  value={formData.rps}
                  onChange={handleNumberChange}
                  min="1"
                />
              </div>
              <div className="test-details-page__param">
                <label className="test-details-page__param-label" htmlFor="rampUp">Ramp-up время:</label>
                <input
                  type="text"
                  id="rampUp"
                  name="rampUp"
                  className="test-details-page__param-input"
                  value={formData.rampUp}
                  onChange={handleInputChange}
                  placeholder="например: 5 минут"
                />
              </div>
            </div>
          ) : (
            <div className="test-details-page__params-grid">
              <div className="test-details-page__param">
                <span className="test-details-page__param-label">Число виртуальных пользователей:</span>
                <span className="test-details-page__param-value">{test.loadParams.virtualUsers}</span>
              </div>
              <div className="test-details-page__param">
                <span className="test-details-page__param-label">Продолжительность:</span>
                <span className="test-details-page__param-value">{test.loadParams.duration}</span>
              </div>
              <div className="test-details-page__param">
                <span className="test-details-page__param-label">RPS (запросов в секунду):</span>
                <span className="test-details-page__param-value">{test.loadParams.rps}</span>
              </div>
              {test.loadParams.rampUp && (
                <div className="test-details-page__param">
                  <span className="test-details-page__param-label">Ramp-up время:</span>
                  <span className="test-details-page__param-value">{test.loadParams.rampUp}</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Детальное описание */}
        <section className="test-details-page__section">
          <h2 className="test-details-page__section-title">Детальное описание</h2>
          
          {isEditing ? (
            <textarea
              id="description"
              name="description"
              className="test-details-page__textarea"
              value={formData.description}
              onChange={handleInputChange}
              rows={10}
              placeholder="Введите описание теста..."
            />
          ) : (
            <div className="test-details-page__description">
              {test.description || 'Описание отсутствует'}
            </div>
          )}
        </section>
      </div>

      <div className="test-details-page__footer">
        {isEditing ? (
          <div className="test-details-page__edit-actions">
            <button className="btn btn--secondary" onClick={handleCancelClick}>
              Отмена
            </button>
            <button className="btn btn--primary" onClick={handleSaveClick}>
              Сохранить
            </button>
          </div>
        ) : (
          <button className="btn btn--primary" onClick={handleEditClick}>
            <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Редактировать
          </button>
        )}
      </div>
    </div>
  );
}
