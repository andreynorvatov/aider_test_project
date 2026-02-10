import { useState, useEffect, useCallback } from 'react';
import './TestPage.scss';

// Используем открытое API JSONPlaceholder для тестовых данных
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Тестовая страница с запросом к открытому API и таблицей с пагинацией
 */
export function TestPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Функция для загрузки данных из API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при загрузке данных');
      console.error('Ошибка при загрузке данных:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Расчёт данных для текущей страницы
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Обработчики пагинации
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Генерация массива номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Рендер состояния загрузки
  if (loading) {
    return (
      <div className="test-page">
        <h1>Тестовая страница</h1>
        <div className="test-page__loading">
          <div className="test-page__spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Рендер состояния ошибки
  if (error) {
    return (
      <div className="test-page">
        <h1>Тестовая страница</h1>
        <div className="test-page__error">
          <p>❌ {error}</p>
          <button onClick={fetchData} className="test-page__retry-btn">
            Повторить загрузку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <h1>Тестовая страница</h1>
      <p className="test-page__description">
        Данные загружены из открытого API JSONPlaceholder (пользователи)
      </p>
      
      <div className="test-page__table-container">
        <table className="test-page__table">
          <thead className="test-page__thead">
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Компания</th>
              <th>Город</th>
            </tr>
          </thead>
          <tbody className="test-page__tbody">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={6} className="test-page__empty">
                  Нет данных для отображения
                </td>
              </tr>
            ) : (
              currentData.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="test-page__link">
                      {user.email}
                    </a>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.company?.name || '—'}</td>
                  <td>{user.address?.city || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="test-page__pagination">
          <button
            className="test-page__pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ← Назад
          </button>
          
          <div className="test-page__pagination-pages">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="test-page__pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`test-page__pagination-page ${currentPage === page ? 'test-page__pagination-page--active' : ''}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              )
            ))}
          </div>
          
          <button
            className="test-page__pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Вперёд →
          </button>
        </div>
      )}

      <div className="test-page__info">
        <p>
          Показано {startIndex + 1}-{Math.min(endIndex, data.length)} из {data.length} записей
        </p>
      </div>
    </div>
  );
}

export default TestPage;
