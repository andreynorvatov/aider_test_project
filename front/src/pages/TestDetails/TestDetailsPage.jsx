import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '../../data/mockTests';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { formatDateTime, toDateTimeLocal } from '../../utils/dateUtils';
import { STATUS_OPTIONS } from '../../utils/statusUtils';
import './TestDetailsPage.scss';

// Иконки
const BackIcon = () => (
  <polyline points="15 18 9 12 15 6"></polyline>
);

const EditIcon = () => (
  <>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </>
);

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
          <Button variant="primary" onClick={() => navigate('/tests')}>
            Вернуться к списку тестов
          </Button>
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

  // Преобразование статусов в формат options
  const statusOptions = STATUS_OPTIONS.map(status => ({ value: status, label: status }));

  return (
    <div className="test-details-page">
      <div className="test-details-page__header">
        <Button variant="secondary" icon={<BackIcon />} onClick={handleBackClick}>
          Назад к списку
        </Button>
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
            </div>
          ) : (
            <div className="test-details-page__info-grid">
              <div className="test-details-page__field">
                <span className="test-details-page__label">Наименование:</span>
                <span className="test-details-page__value test-details-page__value--name">{test.name}</span>
              </div>
              <div className="test-details-page__field">
                <span className="test-details-page__label">Статус:</span>
                <StatusBadge status={test.status} />
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
            <Input
              id="initiator"
              name="initiator"
              label="Кто запустил:"
              value={formData.initiator}
              onChange={handleInputChange}
            />
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
            <Textarea
              id="description"
              name="description"
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
            <Button variant="secondary" onClick={handleCancelClick}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Сохранить
            </Button>
          </div>
        ) : (
          <Button variant="primary" icon={<EditIcon />} onClick={() => setIsEditing(true)}>
            Редактировать
          </Button>
        )}
      </div>
    </div>
  );
}
