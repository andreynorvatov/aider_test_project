import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { StatusBadge } from '../../ui/StatusBadge';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { formatDateTime, toDateTimeLocal } from '../../../utils/dateUtils';
import { STATUS_OPTIONS } from '../../../utils/statusUtils';
import './TestDetailsDrawer.scss';

// Иконки
const ExpandIcon = () => (
  <>
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </>
);

const CloseIcon = () => (
  <>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </>
);

const EditIcon = () => (
  <>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </>
);

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
    
    onSave(updatedTest);
    setIsEditing(false);
  };

  // Открыть на всю страницу
  const handleExpandClick = () => {
    navigate(`/tests/${test.id}`);
  };

  // Преобразование статусов в формат options
  const statusOptions = STATUS_OPTIONS.map(status => ({ value: status, label: status }));

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
              <ExpandIcon />
            </svg>
          </button>
          <button className="test-drawer__close" onClick={onClose} aria-label="Закрыть">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <CloseIcon />
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
              <Input
                id="name"
                name="name"
                label="Наименование:"
                value={formData.name}
                onChange={handleInputChange}
              />
              
              <Select
                id="status"
                name="status"
                label="Статус:"
                value={formData.status}
                onChange={handleInputChange}
                options={statusOptions}
              />
              
              <Input
                type="datetime-local"
                id="startTime"
                name="startTime"
                label="Время запуска:"
                value={toDateTimeLocal(formData.startTime)}
                onChange={handleInputChange}
              />
              
              <Input
                type="datetime-local"
                id="endTime"
                name="endTime"
                label="Время завершения:"
                value={toDateTimeLocal(formData.endTime)}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <div className="test-drawer__field">
                <span className="test-drawer__label">Наименование:</span>
                <span className="test-drawer__value test-drawer__value--name">{test.name}</span>
              </div>
              <div className="test-drawer__field">
                <span className="test-drawer__label">Статус:</span>
                <StatusBadge status={test.status} />
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
            <Input
              id="initiator"
              name="initiator"
              label="Кто запустил:"
              value={formData.initiator}
              onChange={handleInputChange}
            />
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
              <Input
                type="number"
                id="virtualUsers"
                name="virtualUsers"
                label="Число виртуальных пользователей:"
                value={formData.virtualUsers}
                onChange={handleNumberChange}
                min="1"
              />
              <Input
                id="duration"
                name="duration"
                label="Продолжительность:"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="например: 1 час"
              />
              <Input
                type="number"
                id="rps"
                name="rps"
                label="RPS (запросов в секунду):"
                value={formData.rps}
                onChange={handleNumberChange}
                min="1"
              />
              <Input
                id="rampUp"
                name="rampUp"
                label="Ramp-up время:"
                value={formData.rampUp}
                onChange={handleInputChange}
                placeholder="например: 5 минут"
              />
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
            <Textarea
              id="description"
              name="description"
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
            <Button variant="secondary" onClick={handleCancelClick}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Сохранить
            </Button>
          </div>
        ) : (
          <>
            <Button variant="primary" icon={<EditIcon />} onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Закрыть
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
